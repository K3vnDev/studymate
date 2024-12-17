import { ChatMessage } from '@/components/ChatMessage'
import { LoadingIcon } from '@/components/icons'
import { CHAT_ERROR_MESSAGE } from '@/consts'
import { ChatContext } from '@/lib/context/ChatContext'
import { useContext } from 'react'

export const MessagesList = () => {
  const { chatMessages, isWaitingResponse, isOnError, listRef } = useContext(ChatContext)

  return (
    <ul
      className='w-full max-h-full flex flex-col gap-4 py-28 overflow-y-hidden animate-fade-in-fast'
      ref={listRef}
    >
      {chatMessages !== null ? (
        <>
          {chatMessages.map((chatMessage, i) => (
            <ChatMessage {...chatMessage} key={i} />
          ))}
          {isWaitingResponse && <ChatMessage role='bubbles' content='' />}
          {isOnError && <ChatMessage role='error' content={CHAT_ERROR_MESSAGE} />}
        </>
      ) : (
        <div className='absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2'>
          <LoadingIcon className='size-20 animate-spin text-white/25' />
        </div>
      )}
    </ul>
  )
}
