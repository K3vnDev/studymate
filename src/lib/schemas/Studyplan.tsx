import { CATEGORIES } from '@/consts'
import { z } from 'zod'

export const StudyplanUnsavedSchema = z.object({
  name: z.string(),
  desc: z.string(),
  category: z.enum(CATEGORIES),
  daily_lessons: z.array(
    z.object({
      name: z.string(),
      desc: z.string(),
      tasks: z.array(
        z.object({
          goal: z.string(),
          done: z.boolean()
        })
      )
    })
  )
})

export const StudyplanSavedSchema = StudyplanUnsavedSchema.extend({
  id: z.string().uuid(),
  created_by: z.string().uuid()
})
