import { CONTENT_JSON } from '@/consts'
import { useChatsStore } from '@/store/useChatsStore'
import type { ChatMessage } from '@/types.d'
import { dataFetch } from '@/utils/dataFetch'
import { useEffect, useState } from 'react'

export const useChat = () => {
  const chatMessages = useChatsStore(s => s.chatMessages)
  const pushChatMessages = useChatsStore(s => s.pushChatMessages)
  const setChatMessages = useChatsStore(s => s.setChatMessages)
  const [userMessage, setUserMessage] = useState('')

  const getPreviousMessages = () => {
    dataFetch<ChatMessage[]>({
      url: '/api/chat',
      onSuccess: data => {
        setChatMessages(data)
      }
    })
  }
  useEffect(getPreviousMessages, [])

  const messageMate = (message: string) => {
    dataFetch<string>({
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
        pushChatMessages({ role: 'assistant', content: data })
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
    inputProps: {
      onChange: handleChange,
      onKeyDown: handleKeyDown,
      value: userMessage
    }
  }
}
