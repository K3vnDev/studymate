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

export interface AlertData {
  header: string
  message: string

  acceptButton: {
    onClick: () => void | Promise<void>
    icon?: React.ReactNode
    text: string
  }
  rejectButton: {
    onClick: () => void
  }
}

// DB Responses
export interface UserStudyplanAndCurrentDayResponse {
  studyplan: DBUserStudyplan
  current_studyplan_day: {
    day: number
    last_updated: string
  }
}

export interface StudyplansListsResponse {
  studyplans_lists: {
    recommended: string[]
    completed: string[]
    saved: string[]
  }
}

// Schemas
export type ChatMessageSchema = z.infer<typeof ChatMessageSchemaType>
export type MateResponseSchema = z.infer<typeof MateResponseSchemaType>

export type StudyplanUnSaved = z.infer<typeof StudyplanSchemaType>

export type StudyplanSaved = {
  id: string
  created_by: string
} & StudyplanUnSaved

export type DBUserStudyplan = {
  original_id: string
} & StudyplanUnSaved

export type UserStudyplan = {
  current_day: number
} & DBUserStudyplan
