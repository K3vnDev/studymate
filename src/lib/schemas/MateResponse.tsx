import { z } from 'zod'
import { StudyplanSchema } from './Studyplan'

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
