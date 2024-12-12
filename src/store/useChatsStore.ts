import { MATE_INITIAL_MESSAGE } from '@/consts'
import type { ChatMessage } from '@/types.d'
import { create } from 'zustand'

interface ChatsStore {
  chatMessages: ChatMessage[]
  pushChatMessage: (chatMessage: ChatMessage) => void
}

export const useChatsStore = create<ChatsStore>(set => ({
  chatMessages: [
    {
      role: 'assistant',
      content: MATE_INITIAL_MESSAGE
    }
  ],

  pushChatMessage: newChatMessage =>
    set(({ chatMessages }) => {
      return { chatMessages: [...chatMessages, newChatMessage] }
    })
}))
