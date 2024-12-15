import { z } from 'zod'
import { StudyplanUnsavedSchema } from './Studyplan'

export const MateResponseSchema = z.object({
  responses: z.array(
    z.union([
      z.object({
        type: z.enum(['message']),
        data: z.string()
      }),
      z.object({
        type: z.enum(['studyplan']),
        data: StudyplanUnsavedSchema
      })
    ])
  )
})

export type MateResponse = z.infer<typeof MateResponseSchema>
