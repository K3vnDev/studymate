import { CONTENT_JSON, EVENTS } from '@/consts'
import { dataFetch } from '@/lib/utils/dataFetch'
import { useChatStore } from '@/store/useChatStore'
import type { ChatMessage, ChatMessagesDBResponse, MateResponseSchema } from '@/types.d'
import { useEffect, useRef, useState } from 'react'
import { useEvent } from './useEvent'

export const useChatMessages = () => {
  const messages = useChatStore(s => s.messages)
  const pushMessages = useChatStore(s => s.pushMessages)
  const setMessages = useChatStore(s => s.setMessages)
  const setHighlihtedMessage = useChatStore(s => s.setHighlihtedMessage)
  const userInput = useChatStore(s => s.userInput)
  const setUserInput = useChatStore(s => s.setUserInput)

  const [isWaitingResponse, setIsWaitingRespose] = useState(false)
  const [isOnError, setIsOnError] = useState(false)

  const tryAgainCallback = useRef<() => void>(() => {})

  // Load previous messages
  useEffect(() => {
    if (messages !== null) return

    dataFetch<ChatMessagesDBResponse[]>({
      url: '/api/chat',
      onSuccess: data => {
        const newMessages = data.map(msg => {
          return msg.role === 'system'
            ? { role: 'studyplan', content: JSON.parse(msg.content) }
            : msg
        }) as ChatMessage[]
        setMessages(newMessages)
      }
    })
  }, [])

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
          prevMessages: messages?.filter(({ role }) =>
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

        pushMessages(...chatMessages)
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
    isOnError,
    inputProps: {
      onChange: handleChange,
      onKeyDown: handleKeyDown,
      value: userInput
    }
  }
}
