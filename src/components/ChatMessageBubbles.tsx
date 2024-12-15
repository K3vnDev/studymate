import { repeat } from '@/lib/utils/repeat'
import { ChatMessage } from './ChatMessage'

export const ChatMessageBubbles = () => (
  <ChatMessage role='assistant'>
    <div className='flex gap-2 items-center justify-center h-7 w-12'>
      {repeat(3, i => (
        <div
          className='size-[0.625rem] bg-[#ccc] rounded-full'
          style={{
            animation: `chat-message-bubbles-pounce 0.4s ease ${i * 0.2}s both infinite alternate`
          }}
          key={i}
        />
      ))}
    </div>
  </ChatMessage>
)
