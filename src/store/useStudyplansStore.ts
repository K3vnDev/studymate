import type { StudyplanSaved, StudyplanUnSaved, UserStudyplan } from '@/types.d'
import { create } from 'zustand'

export interface StudyplansStore {
  studyplan: StudyplanSaved | StudyplanUnSaved | UserStudyplan | null
  setStudyplan: (value: StudyplansStore['studyplan']) => void
}

export const useStudyplansStore = create<StudyplansStore>(set => ({
  studyplan: null,
  setStudyplan: value => set(() => ({ studyplan: value }))
}))
