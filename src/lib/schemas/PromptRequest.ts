import { StudyplanSchema } from '@schemas/Studyplan'
import { z } from 'zod'

export const PromptRequestSchema = z.object({
  messages: z.object({
    previous: z.array(
      z.union([
        z.object({
          role: z.enum(['user', 'assistant']),
          content: z.string().trim().nonempty()
        }),
        z.object({
          role: z.enum(['studyplan']),
          content: StudyplanSchema
        })
      ])
    ),
    new: z.string().trim().nonempty()
  }),
  user_data: z.object({
    current_studyplan: StudyplanSchema.extend({
      original_id: z.string(),
      current_day: z.number()
    }).nullable()
  })
})
