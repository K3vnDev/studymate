import { ChatMessage } from '@/app/chat/ChatMessage'
import { ChatContext } from '@/lib/context/ChatContext'
import { useChatStore } from '@/store/useChatStore'
import { CHAT_ERROR_MESSAGE } from '@consts'
import type { ChatMessage as ChatMessageType } from '@types'
import { useContext } from 'react'

export const MessagesList = () => {
  const messages = useChatStore(s => s.messages) as ChatMessageType[]
  const { isWaitingResponse, isOnChatError, listRef } = useContext(ChatContext)

  return (
    <ul
      className={`
        w-full max-h-full flex flex-col gap-4 pb-16 pt-32 
        overflow-hidden animate-fade-in-fast mb-12
      `}
      ref={listRef}
    >
      {messages.map((message, i) => (
        <ChatMessage {...message} key={i} />
      ))}
      {isWaitingResponse && <ChatMessage role='bubbles' content='' />}
      {isOnChatError && <ChatMessage role='error' content={CHAT_ERROR_MESSAGE} />}
    </ul>
  )
}
