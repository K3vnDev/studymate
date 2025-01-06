import { z } from 'zod'
import { StudyplanSchema } from './Studyplan'

export const MessageContentSchema = z.string().trim().nonempty()

export const ChatMessageSchema = z.union([
  z.object({
    role: z.enum(['user', 'assistant']),
    content: MessageContentSchema
  }),
  z.object({
    role: z.enum(['studyplan']),
    content: StudyplanSchema
  })
])
