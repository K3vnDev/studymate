import { StudyplanSchema } from '@schemas/Studyplan'
import { z } from 'zod'

export const MateResponseSchema = z.object({
  responses: z.array(
    z.union([
      z.object({
        type: z.enum(['message']),
        data: z.string()
      }),
      z.object({
        type: z.enum(['studyplan']),
        data: StudyplanSchema
      })
    ])
  )
})
