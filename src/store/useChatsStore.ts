import { MATE_INITIAL_MESSAGE } from '@/consts'
import type { ChatMessage } from '@/types.d'
import { create } from 'zustand'

interface ChatsStore {
  chatMessages: ChatMessage[]
  setChatMessages: (chatMessages: ChatMessage[]) => void
  pushChatMessages: (...chatMessages: ChatMessage[]) => void
}

export const useChatsStore = create<ChatsStore>(set => ({
  chatMessages: [],

  setChatMessages: chatMessages => set({ chatMessages }),

  pushChatMessages: (...newChatMessages) =>
    set(({ chatMessages }) => {
      return { chatMessages: [...chatMessages, ...newChatMessages] }
    })
}))
