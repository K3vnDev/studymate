import type { CATEGORIES } from './consts'

export type Category = (typeof CATEGORIES)[number]

export interface ChatMessage {
  role: 'user' | 'assistant'
  content: string
}

export interface MessageAssistantData {
  prevMessages?: ChatMessage[]
  newMessage?: string
}

export interface Studyplan {
  id: string
  name: string
  desc: string
  category: Category
  daily_lessons: [
    {
      name: string
      desc: string
      tasks: {
        goal: string
      }
    }
  ]
}
