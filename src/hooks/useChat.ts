import { useChatStore } from '@/store/useChatStore'
import { useEffect } from 'react'
import { useEvent } from './useEvent'
import { useChatMessages } from './useChatMessages'

export const useChat = () => {
  const userInput = useChatStore(s => s.userInput)
  const { isOnChatError, isOnLoadingError, isWaitingResponse, loadPreviousMessages } = useChatMessages()

  useEffect(loadPreviousMessages, [])

  // Resend message when user presses try again
  useEvent(EVENTS.ON_CHAT_TRY_AGAIN, tryAgainCallback.current, [isOnChatError])

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
}
