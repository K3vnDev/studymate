import type { MateResponseSchema as MateResponseSchemaType } from '@/lib/schemas/MateResponse'
import type { PromptRequestSchema as PromptRequestSchemaType } from '@/lib/schemas/PromptRequest'
import type { StudyplanSchema as StudyplanSchemaType } from '@/lib/schemas/Studyplan'
import type { CATEGORIES } from '@consts'
import type { z } from 'zod'

export type Category = (typeof CATEGORIES)[number]

export type ChatMessage =
  | {
      role: 'assistant' | 'user' | 'error'
      content: string
    }
  | {
      role: 'studyplan'
      content: ChatStudyplan
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
export interface DBUserStudyplanAndCurrentDayResponse {
  studyplan: DBUserStudyplan
  current_studyplan_day: DBCurrentStudyplanDay
}

export interface DBCurrentStudyplanDay {
  day: number
  last_updated: string
}

export interface DBStudyplansLists {
  studyplans_lists: {
    recommended: string[]
    completed: string[]
    saved: string[]
  }
}

// Schemas
export type MateResponseSchema = z.infer<typeof MateResponseSchemaType>
export type PromptRequestSchema = z.infer<typeof PromptRequestSchemaType>

// Studyplan Shemas
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

export type ChatStudyplan = {
  original_id: string | null
  chat_message_id: string | null
} & StudyplanUnSaved

export interface DBChatWithMate {
  role: 'user' | 'assistant' | 'studyplan'
  content: string
}
