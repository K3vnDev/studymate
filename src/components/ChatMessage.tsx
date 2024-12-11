import type { ChatMessage as ChatMessageType } from '@/types.d'

export const ChatMessage = ({ role, content }: ChatMessageType) => {
  const style: React.CSSProperties =
    role === 'assistant'
      ? {
          background: '#222',
          color: '#ccc',
          borderStartStartRadius: 0,
          alignSelf: 'start'
        }
      : {
          background: '#6168E8',
          color: '#fff',
          borderStartEndRadius: 0,
          alignSelf: 'end'
        }

  return (
    <li className='px-6 list-none py-3 w-fit max-w-96 rounded-3xl' style={style}>
      {content}
    </li>
  )
}
