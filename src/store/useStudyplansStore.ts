import type { StudyplanSaved, StudyplanUnSaved, UserStudyplan } from '@/types.d'
import { create } from 'zustand'

export interface StudyplansStore {
  studyplans: {
    recomended: StudyplanSaved[]
  }
  setStudyplans: (key: keyof StudyplansStore['studyplans'], value: StudyplanSaved[]) => void

  studyplan: StudyplanSaved | StudyplanUnSaved | UserStudyplan | null
  setStudyplan: (value: StudyplansStore['studyplan']) => void
}

export const useStudyplansStore = create<StudyplansStore>(set => ({
  studyplans: { recomended: [] },

  setStudyplans: (key, value) =>
    set(({ studyplans }) => {
      const newStudyplans = { ...studyplans }
      newStudyplans[key] = value

      return { studyplans: newStudyplans }
    }),

  studyplan: null,
  setStudyplan: value => set(() => ({ studyplan: value }))
}))
