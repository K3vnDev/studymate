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
      const clonedStudyplans = structuredClone(studyplans)

      newStudyplans.forEach(addingStudyplan => {
        if (!clonedStudyplans.some(({ id }) => id === addingStudyplan.id)) {
          clonedStudyplans.push(addingStudyplan)
        }
      })
      return { studyplans: clonedStudyplans }
    })
}))
