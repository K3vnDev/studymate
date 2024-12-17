import { CONTENT_JSON, EVENTS } from '@/consts'
import { dataFetch } from '@/lib/utils/dataFetch'
import { useChatsStore } from '@/store/useChatsStore'
import type { ChatMessage, ChatMessagesDBResponse, MateResponseSchema } from '@/types.d'
import { useEffect, useRef, useState } from 'react'
import { useEvent } from './useEvent'

export const useChatMessages = () => {
  const chatMessages = useChatsStore(s => s.chatMessages)
  const pushChatMessages = useChatsStore(s => s.pushChatMessages)
  const setChatMessages = useChatsStore(s => s.setChatMessages)

  const userChatInput = useChatsStore(s => s.userChatInput)
  const setUserChatInput = useChatsStore(s => s.setUserChatInput)

  const [isWaitingResponse, setIsWaitingRespose] = useState(false)
  const [isOnError, setIsOnError] = useState(false)
  const tryAgainCallback = useRef<() => void>(() => {})

  // Load previous messages
  useEffect(() => {
    if (chatMessages === null) loadPreviousMessages()
  }, [])

  const loadPreviousMessages = () => {
    dataFetch<ChatMessagesDBResponse[]>({
      url: '/api/chat',
      onSuccess: data => {
        const newMessages = data.map(msg => {
          return msg.role === 'system'
            ? { role: 'studyplan', content: JSON.parse(msg.content) }
            : msg
        }) as ChatMessage[]
        setChatMessages(newMessages)
      }
    })
  }

  // Resend message when user presses try again
  useEvent(EVENTS.ON_CHAT_TRY_AGAIN, tryAgainCallback.current, [isOnError])

  const messageMate = (message: string) => {
    setIsWaitingRespose(true)
    setIsOnError(false)

    dataFetch<MateResponseSchema>({
      url: '/api/chat',
      options: {
        headers: CONTENT_JSON,
        method: 'POST',
        body: JSON.stringify({
          prevMessages: chatMessages?.filter(({ role }) =>
            ['studyplan', 'user', 'assistant'].includes(role)
          ),
          newMessage: message
        })
      },
      onSuccess: data => {
        const chatMessages = data.responses.map(({ type, data }) => ({
          role: type === 'message' ? 'assistant' : 'studyplan',
          content: data
        })) as ChatMessage[]

        pushChatMessages(...chatMessages)
        setIsWaitingRespose(false)
      },
      onError: () => {
        setIsOnError(true)
        setIsWaitingRespose(false)

        tryAgainCallback.current = () => messageMate(message)
      }
    })
  }

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setUserChatInput(e.target.value)
  }

  const handleSubmit = (e?: React.FormEvent<HTMLFormElement>) => {
    e?.preventDefault()

    const trimmedMessage = userChatInput.trim()
    if (trimmedMessage === '') return

    pushChatMessages({ role: 'user', content: trimmedMessage })
    messageMate(trimmedMessage)
    setUserChatInput('')
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit()
    }
  }

  return {
    chatMessages,
    handleSubmit,
    isWaitingResponse,
    isOnError,
    inputProps: {
      onChange: handleChange,
      onKeyDown: handleKeyDown,
      value: userChatInput
    }
  }
}
