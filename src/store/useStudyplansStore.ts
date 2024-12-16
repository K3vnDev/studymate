import type { StudyplanSchema } from '@/types.d'
import { create } from 'zustand'

interface StudyplansStore {
  studyplans: {
    recomended: StudyplanSchema[]
  }
  setStudyplans: (newStudyplans: StudyplansStore['studyplans']) => void

  studyplan: StudyplanSchema | null
  setStudyplan: (value: StudyplanSchema | null) => void
}

export const useStudyplansStore = create<StudyplansStore>(set => ({
  studyplans: { recomended: [] },
  setStudyplans: newStudyplans => set(() => ({ studyplans: newStudyplans })),

  studyplan: null,
  setStudyplan: value => set(() => ({ studyplan: value }))
}))
