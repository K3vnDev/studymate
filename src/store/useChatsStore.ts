import type { ChatMessage } from '@/types.d'
import { create } from 'zustand'

interface ChatsStore {
  chatMessages: ChatMessage[] | null
  setChatMessages: (chatMessages: ChatMessage[] | null) => void
  pushChatMessages: (...chatMessages: ChatMessage[]) => void
}

export const useChatsStore = create<ChatsStore>(set => ({
  chatMessages: null,

  setChatMessages: chatMessages => set({ chatMessages }),

  pushChatMessages: (...newChatMessages) =>
    set(({ chatMessages }) => {
      const prevChatMessages = chatMessages ?? []
      return { chatMessages: [...prevChatMessages, ...newChatMessages] }
    })
}))
