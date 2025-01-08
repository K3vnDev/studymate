import { CONTENT_JSON, EVENTS } from '@/consts'
import { dataFetch } from '@/lib/utils/dataFetch'
import { useChatStore } from '@/store/useChatStore'
import type { ChatMessage, ChatMessagesDBResponse, MateResponseSchema, PromptRequestSchema } from '@/types.d'
import { useEffect, useRef, useState } from 'react'
import { useEvent } from './useEvent'
import { useUserStudyplan } from './useUserStudyplan'

export const useChatMessages = () => {
  const messages = useChatStore(s => s.messages)
  const pushMessages = useChatStore(s => s.pushMessages)
  const setMessages = useChatStore(s => s.setMessages)
  const setHighlihtedMessage = useChatStore(s => s.setHighlihtedMessage)
  const userInput = useChatStore(s => s.userInput)
  const setUserInput = useChatStore(s => s.setUserInput)
  const { userStudyplan } = useUserStudyplan()

  const [isWaitingResponse, setIsWaitingRespose] = useState(false)
  const [isOnChatError, setIsOnChatError] = useState(false)
  const [isOnLoadingError, setIsOnLoadingError] = useState(false)

  const tryAgainCallback = useRef<() => void>(() => {})

  const loadPreviousMessages = () => {
    if (messages) return
    setIsOnLoadingError(false)

    dataFetch<ChatMessagesDBResponse[]>({
      url: '/api/chat',
      onSuccess: data => {
        const newMessages = data.map(msg =>
          msg.role === 'system' ? { role: 'studyplan', content: JSON.parse(msg.content) } : msg
        )
        setMessages(newMessages as ChatMessage[])
      },
      onError: () => setIsOnLoadingError(true)
    })
  }
  useEffect(loadPreviousMessages, [])

  // Resend message when user presses try again
  useEvent(EVENTS.ON_CHAT_TRY_AGAIN, tryAgainCallback.current, [isOnChatError])

  const messageMate = (message: string) => {
    if (!messages) return

    setIsWaitingRespose(true)
    setIsOnChatError(false)

    const previous = messages.filter(
      ({ role }) => role !== 'error'
    ) as PromptRequestSchema['messages']['previous']

    const requestBody: PromptRequestSchema = {
      messages: { new: message, previous },
      userData: { currentStudyplan: userStudyplan }
    }
    console.log('Sent!!!')

    dataFetch<MateResponseSchema['responses']>({
      url: '/api/chat',
      options: {
        headers: CONTENT_JSON,
        method: 'POST',
        body: JSON.stringify(requestBody)
      },

      onSuccess: data => {
        const chatMessages = data.map(({ type, data }) => ({
          role: type === 'message' ? 'assistant' : 'studyplan',
          content: data
        })) as ChatMessage[]

        pushMessages(...chatMessages)
        setIsWaitingRespose(false)
      },
      onError: () => {
        setIsOnChatError(true)
        setIsWaitingRespose(false)

        tryAgainCallback.current = () => messageMate(message)
      }
    })
  }

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setUserInput(e.target.value)
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
