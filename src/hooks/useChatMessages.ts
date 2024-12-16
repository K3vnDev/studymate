import { CONTENT_JSON } from '@/consts'
import { dataFetch } from '@/lib/utils/dataFetch'
import { useChatsStore } from '@/store/useChatsStore'
import type { ChatMessage, ChatMessagesDBResponse, MateResponseSchema } from '@/types.d'
import { useEffect, useState } from 'react'

export const useChatMessages = () => {
  const chatMessages = useChatsStore(s => s.chatMessages)
  const pushChatMessages = useChatsStore(s => s.pushChatMessages)
  const setChatMessages = useChatsStore(s => s.setChatMessages)
  const [userMessage, setUserMessage] = useState('')
  const [isWaitingResponse, setIsWaitingRespose] = useState(false)

  useEffect(() => {
    if (chatMessages !== null) return

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
  }, [])

  const messageMate = (message: string) => {
    setIsWaitingRespose(true)

    dataFetch<MateResponseSchema>({
      url: '/api/chat',
      options: {
        headers: CONTENT_JSON,
        method: 'POST',
        body: JSON.stringify({
          prevMessages: chatMessages,
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
      }
    })
  }

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setUserMessage(e.target.value)
  }

  const handleSubmit = (e?: React.FormEvent<HTMLFormElement>) => {
    e?.preventDefault()

    const trimmedMessage = userMessage.trim()
    if (trimmedMessage === '') return

    pushChatMessages({ role: 'user', content: trimmedMessage })
    messageMate(trimmedMessage)
    setUserMessage('')
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
    inputProps: {
      onChange: handleChange,
      onKeyDown: handleKeyDown,
      value: userMessage
    }
  }
}
