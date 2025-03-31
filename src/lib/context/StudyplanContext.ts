import type { Props } from '@/components/Studyplan/Studyplan'
import { createContext } from 'react'

interface StudyplanContext {
  studyplan: Props['studyplan']
  usersCurrent: boolean
  isCompleted: boolean
  userHasAnotherStudyplan: boolean
  justCompleted: boolean
  isSaved: boolean
  publicId: string | null
}

export const StudyplanContext = createContext<StudyplanContext>({
  studyplan: undefined as any,
  usersCurrent: false,
  isCompleted: false,
  userHasAnotherStudyplan: false,
  justCompleted: false,
  isSaved: false,
  publicId: null
})
