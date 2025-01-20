import { z } from 'zod'

export const DatabaseChatSchema = z.array(
  z.object({
    role: z.enum(['user', 'assistant', 'studyplan']),
    content: z.string()
  })
)
