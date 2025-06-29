import { dataFetch } from '@/lib/utils/dataFetch'
import { useChatStore } from '@/store/useChatStore'
import { useStudyplansStore } from '@/store/useStudyplansStore'
import { CONTENT_JSON, EVENTS, USER_MAX_MESSAGE_LENGTH } from '@consts'
import { useEvent } from '@hooks/useEvent'
import { useUserStudyplan } from '@hooks/useUserStudyplan'
import type { ChatMessage, ChatStudyplan, PromptRequestSchema, StudyplanSaved } from '@types'
import { useEffect, useRef, useState } from 'react'

export const useChatMessages = () => {
  const messages = useChatStore(s => s.messages)
  const pushMessages = useChatStore(s => s.pushMessages)
  const setMessages = useChatStore(s => s.setMessages)
  const setHighlihtedMessage = useChatStore(s => s.setHighlihtedMessage)
  const userInput = useChatStore(s => s.userInput)
  const setUserInput = useChatStore(s => s.setUserInput)
  const addStudyplans = useStudyplansStore(s => s.addStudyplans)
  const { userStudyplan } = useUserStudyplan()

  const [isWaitingResponse, setIsWaitingRespose] = useState(false)
  const [isOnChatError, setIsOnChatError] = useState(false)
  const [isOnLoadingError, setIsOnLoadingError] = useState(false)

  const tryAgainCallback = useRef<() => void>(() => {})

  const loadPreviousMessages = () => {
    if (messages) return
    setIsOnLoadingError(false)

    dataFetch<ChatMessage[]>({
      url: '/api/chat',
      onSuccess: newMessages => {
        setMessages(newMessages)
        preloadChatStudyplans(newMessages)
      },
      onError: () => setIsOnLoadingError(true),
      redirectOn401: true
    })
  }
  useEffect(loadPreviousMessages, [])

  const preloadChatStudyplans = (chatMessages: ChatMessage[]) => {
    const chatStudyplans: ChatStudyplan[] = chatMessages
      .filter(m => m.role === 'studyplan')
      .map(m => m.content)
    const studyplansIds = chatStudyplans.filter(s => s.original_id).map(s => s.original_id as string)

    dataFetch<StudyplanSaved[]>({
      url: '/api/studyplans',
      options: {
        headers: CONTENT_JSON,
        method: 'POST',
        body: JSON.stringify(studyplansIds)
      },
      onSuccess: studyplans => addStudyplans(...studyplans)
    })
  }

  // Resend message when user presses try again
  useEvent(EVENTS.ON_CHAT_TRY_AGAIN, tryAgainCallback.current, [isOnChatError])

  const parsePreviousMessages = (messages: ChatMessage[]) =>
    messages.filter(({ role }) => role !== 'error') as PromptRequestSchema['messages']['previous']

  const messageMate = (message: string) => {
    if (messages === null) return

    setIsWaitingRespose(true)
    setIsOnChatError(false)

    dataFetch<ChatMessage[]>({
      url: '/api/chat',
      options: {
        headers: CONTENT_JSON,
        method: 'POST',
        body: JSON.stringify({
          messages: {
            new: message,
            previous: parsePreviousMessages(messages)
          },
          user_data: { current_studyplan: userStudyplan }
        } as PromptRequestSchema)
      },
      onSuccess: messages => pushMessages(...messages),
      onFinish: () => setIsWaitingRespose(false),
      redirectOn401: true,

      onError: () => {
        setIsOnChatError(true)
        tryAgainCallback.current = () => messageMate(message)
      }
    })
  }

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = e.target

    if (value.length <= USER_MAX_MESSAGE_LENGTH) {
      setUserInput(value)
    }
  }

  const handleSubmit = (e?: React.FormEvent<HTMLFormElement>) => {
    e?.preventDefault()

    const trimmedMessage = userInput.trim()
    if (trimmedMessage === '') return

    pushMessages({ role: 'user', content: trimmedMessage })
    messageMate(trimmedMessage)
    setUserInput('')
    setHighlihtedMessage(null)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit()
    }
  }

  return {
    handleSubmit,
    isWaitingResponse,
    isOnChatError,
    isOnLoadingError,
    loadPreviousMessages,
    inputProps: {
      onChange: handleChange,
      onKeyDown: handleKeyDown,
      value: userInput
    }
  }
}
