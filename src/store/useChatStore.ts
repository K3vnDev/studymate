import type { ChatMessage } from '@types'
import { create } from 'zustand'

interface ChatsStore {
  messages: ChatMessage[] | null
  setMessages: (chatMessages: ChatMessage[] | null) => void
  pushMessages: (...chatMessages: ChatMessage[]) => void

  userInput: string
  setUserInput: (value: string) => void

  highlightedMessage: string | null
  setHighlihtedMessage: (value: string | null) => void
}

export const useChatStore = create<ChatsStore>(set => ({
  messages: null,
  setMessages: chatMessages => set({ messages: chatMessages }),

  pushMessages: (...newChatMessages) =>
    set(({ messages: chatMessages }) => {
      const prevChatMessages = chatMessages ?? []
      return { messages: [...prevChatMessages, ...newChatMessages] }
    }),

  userInput: '',
  setUserInput: value => set(() => ({ userInput: value })),

  highlightedMessage: null,
  setHighlihtedMessage: value => set(() => ({ highlightedMessage: value }))
}))
