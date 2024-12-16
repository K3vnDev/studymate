import { z } from 'zod'
import { StudyplanSchema } from './Studyplan'

export const ChatMessageSchema = z.union([
  z.object({
    role: z.enum(['user', 'assistant']),
    content: z.string().trim()
  }),
  z.object({
    role: z.enum(['studyplan']),
    content: StudyplanSchema
  })
])
