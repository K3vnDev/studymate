import type { StudyplanSaved, StudyplanUnSaved } from '@/types.d'
import { create } from 'zustand'

interface StudyplansStore {
  studyplans: {
    recomended: StudyplanSaved[]
  }
  setStudyplans: (newStudyplans: StudyplansStore['studyplans']) => void

  studyplan: StudyplanSaved | StudyplanUnSaved | null
  setStudyplan: (value: StudyplanSaved | StudyplanUnSaved | null) => void
}

export const useStudyplansStore = create<StudyplansStore>(set => ({
  studyplans: { recomended: [] },
  setStudyplans: newStudyplans => set(() => ({ studyplans: newStudyplans })),

  studyplan: null,
  setStudyplan: value => set(() => ({ studyplan: value }))
}))
