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
      className='w-full max-h-full flex flex-col gap-4 py-28 overflow-hidden animate-fade-in-fast'
      ref={listRef}
    >
      {messages.map((chatMessage, i) => (
        <ChatMessage {...chatMessage} key={i} />
      ))}
      {isWaitingResponse && <ChatMessage role='bubbles' content='' />}
      {isOnChatError && <ChatMessage role='error' content={CHAT_ERROR_MESSAGE} />}
    </ul>
  )
}
