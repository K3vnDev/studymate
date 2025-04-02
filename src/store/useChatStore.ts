import { parseChatMessages } from '@/lib/utils/parseChatMessages'
import type { ChatMessage, ChatStudyplan } from '@types'
import { create } from 'zustand'

interface ChatsStore {
  messages: ChatMessage[] | null
  setMessages: (chatMessages: ChatMessage[] | null) => void
  pushMessages: (...chatMessages: ChatMessage[]) => void

  userInput: string
  setUserInput: (value: string) => void

  highlightedMessage: string | null
  setHighlihtedMessage: (value: string | null) => void

  setStudyplanOriginalId: (
    messageId: string,
    newOriginalId: string,
    callback?: (newMessages: ChatMessage[]) => void
  ) => void
}

export const useChatStore = create<ChatsStore>(set => ({
  messages: null,
  setMessages: chatMessages =>
    set(() => {
      const messages = chatMessages ? parseChatMessages(chatMessages) : null
      return { messages }
    }),

  pushMessages: (...newMessages) =>
    set(({ messages }) => {
      const prevMessages = messages ?? []
      const parsedNewMessages = parseChatMessages(newMessages)
      return { messages: [...prevMessages, ...parsedNewMessages] }
    }),

  userInput: '',
  setUserInput: value => set(() => ({ userInput: value })),

  highlightedMessage: null,
  setHighlihtedMessage: value => set(() => ({ highlightedMessage: value })),

  setStudyplanOriginalId: (chatMessageId, newOriginalId, callback = () => {}) =>
    set(({ messages }) => {
      if (messages === null) return {}

      const index = messages.findIndex(
        ({ role, content }) => role === 'studyplan' && content.chat_message_id === chatMessageId
      )
      if (index === -1) return {}

      const newMessages = structuredClone(messages)
      const newChatStudyplan = newMessages[index]
      ;(newChatStudyplan.content as ChatStudyplan).original_id = newOriginalId

      newMessages.splice(index, 1, newChatStudyplan)

      if (callback) {
        callback(newMessages)
      }

      return { messages: newMessages }
    })
}))
