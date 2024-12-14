import type { Studyplan } from '@/types'
import { create } from 'zustand'

interface StudyplansStore {
  studyplans: {
    recomended: Studyplan[]
  }
  setStudyplans: (newStudyplans: StudyplansStore['studyplans']) => void

  studyplan: Studyplan | null
  setStudyplan: (value: Studyplan | null) => void
}

export const useStudyplansStore = create<StudyplansStore>(set => ({
  studyplans: { recomended: [] },
  setStudyplans: newStudyplans => set(() => ({ studyplans: newStudyplans })),

  studyplan: null,
  setStudyplan: value => set(() => ({ studyplan: value }))
}))
