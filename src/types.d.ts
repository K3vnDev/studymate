import type { CATEGORIES } from './consts'

export type Category = (typeof CATEGORIES)[number]

export interface Studyplan {
  name: string
  category: Category
  duration: number
}
