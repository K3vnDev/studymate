import type { ChatMessage } from '@/types.d'
import { createContext } from 'react'

interface ChatContext {
  chatMessages: ChatMessage[] | null
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void
  isWaitingResponse: boolean
  isOnError: boolean
  inputProps: {
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
    onKeyDown: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void
    value: string
  }
  listRef: React.MutableRefObject<null>
  scrollRef: React.MutableRefObject<null>
  scrollDownButtonProps: {
    onClick: () => void
    style: React.CSSProperties
  }
}

export const ChatContext = createContext<ChatContext>({
  chatMessages: null,
  handleSubmit: () => {},
  isWaitingResponse: false,
  isOnError: false,
  inputProps: {
    onChange: () => {},
    onKeyDown: () => {},
    value: ''
  },
  listRef: { current: null },
  scrollRef: { current: null },
  scrollDownButtonProps: {
    onClick: () => {},
    style: {}
  }
})
