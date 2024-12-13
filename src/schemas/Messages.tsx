import { z } from 'zod'

export const MessagesSchema = z.array(
  z.object({
    role: z.enum(['user', 'assistant']),
    content: z.string().trim()
  })
)
