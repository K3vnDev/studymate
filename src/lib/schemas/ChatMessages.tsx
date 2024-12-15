import { z } from 'zod'

export const ChatMessagesSchema = z.array(
  z.object({
    role: z.enum(['user', 'assistant']),
    content: z.string().trim()
  })
)
