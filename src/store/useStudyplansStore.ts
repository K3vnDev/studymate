import type { ChatStudyplan, StudyplanSaved, StudyplanUnSaved, UserStudyplan } from '@types'
import { create } from 'zustand'

export interface StudyplansStore {
  studyplan: StudyplanSaved | StudyplanUnSaved | UserStudyplan | ChatStudyplan | null
  setStudyplan: (value: StudyplansStore['studyplan']) => void

  studyplans: StudyplanSaved[]
  addStudyplans: (...values: StudyplanSaved[]) => void
}

export const useStudyplansStore = create<StudyplansStore>(set => ({
  studyplan: null,
  setStudyplan: value => set(() => ({ studyplan: value })),

  studyplans: [],

  addStudyplans: (...newStudyplans) =>
    set(({ studyplans }) => {
      const clonedStudyplans = [...studyplans]

      newStudyplans.forEach(studyplan => {
        if (!clonedStudyplans.some(({ id }) => id === studyplan.id)) {
          clonedStudyplans.push(studyplan)
        }
      })
      return { studyplans: clonedStudyplans }
    })
}))
