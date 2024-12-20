import type { z } from 'zod'
import type { CATEGORIES } from './consts'
import type { ChatMessageSchema as ChatMessageSchemaType } from './lib/schemas/ChatMessage'
import type { MateResponseSchema as MateResponseSchemaType } from './lib/schemas/MateResponse'
import type { StudyplanSchema as StudyplanSchemaType } from './lib/schemas/Studyplan'

export type Category = (typeof CATEGORIES)[number]

export type ChatMessage =
  | {
      role: 'assistant' | 'user' | 'error'
      content: string
    }
  | {
      role: 'studyplan'
      content: StudyplanUnsavedSchema
    }

export type ChatMessagesDBResponse = {
  role: 'assistant' | 'user' | 'system'
  content: string
}

export interface MessageAssistantData {
  prevMessages?: ChatMessageSchemaType[]
  newMessage?: string
}

// Schemas
export type ChatMessageSchema = z.infer<typeof ChatMessageSchemaType>
export type MateResponseSchema = z.infer<typeof MateResponseSchemaType>

export type StudyplanUnSaved = z.infer<typeof StudyplanSchemaType>

export type StudyplanSaved = {
  id: string
  created_by: string
} & StudyplanUnSaved

export type UserStudyplan = {
  original_id: string
  current_day: number
} & StudyplanUnSaved
