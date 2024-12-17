import type { ChatMessage } from '@/types.d'
import { create } from 'zustand'

interface ChatsStore {
  chatMessages: ChatMessage[] | null
  setChatMessages: (chatMessages: ChatMessage[] | null) => void
  pushChatMessages: (...chatMessages: ChatMessage[]) => void

  userChatInput: string
  setUserChatInput: (value: string) => void

  highlightedMessage: string | null
  setHighlihtedMessage: (value: string | null) => void
}

export const useChatsStore = create<ChatsStore>(set => ({
  chatMessages: null,
  setChatMessages: chatMessages => set({ chatMessages }),

  pushChatMessages: (...newChatMessages) =>
    set(({ chatMessages }) => {
      const prevChatMessages = chatMessages ?? []
      return { chatMessages: [...prevChatMessages, ...newChatMessages] }
    }),

  userChatInput: '',
  setUserChatInput: value => set(() => ({ userChatInput: value })),

  highlightedMessage: null,
  setHighlihtedMessage: value => set(() => ({ highlightedMessage: value }))
}))
