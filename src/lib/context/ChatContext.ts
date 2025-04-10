import { createContext } from 'react'

interface ChatContext {
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void
  isWaitingResponse: boolean
  isOnChatError: boolean
  isOnLoadingError: boolean
  inputProps: {
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
    onKeyDown: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void
    value: string
  }
  listRef: React.MutableRefObject<any>
  scrollRef: React.MutableRefObject<any>
  scrollIsOnBottom: boolean
  loadPreviousMessages: () => void
}

export const ChatContext = createContext<ChatContext>({
  handleSubmit: () => {},
  isWaitingResponse: false,
  isOnChatError: false,
  isOnLoadingError: false,
  inputProps: {
    onChange: () => {},
    onKeyDown: () => {},
    value: ''
  },
  listRef: { current: null },
  scrollRef: { current: null },
  scrollIsOnBottom: true,
  loadPreviousMessages: () => {}
})
