import type { StudyplanSaved, StudyplanUnSaved, UserStudyplan } from '@/types.d'
import { create } from 'zustand'

export interface StudyplansStore {
  studyplans: {
    recomended?: StudyplanSaved[]
    completed?: StudyplanSaved[]
  }
  setStudyplans: (
    callback: (studyplans: StudyplansStore['studyplans']) => StudyplansStore['studyplans']
  ) => void

  studyplan: StudyplanSaved | StudyplanUnSaved | UserStudyplan | null
  setStudyplan: (value: StudyplansStore['studyplan']) => void
}

export const useStudyplansStore = create<StudyplansStore>(set => ({
  studyplans: {},

  setStudyplans: callback =>
    set(({ studyplans }) => {
      return { studyplans: callback({ ...studyplans }) }
    }),

  studyplan: null,
  setStudyplan: value => set(() => ({ studyplan: value }))
}))
