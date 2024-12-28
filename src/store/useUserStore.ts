import type { UserStudyplan } from '@/types.d'
import { create } from 'zustand'

export interface UserStore {
  studyplan: UserStudyplan | null | undefined
  setStudyplan: (studyplan: UserStudyplan | null) => void

  setTaskDone: (index: number, value: boolean) => void

  studyplansLists: {
    recomended?: string[]
    completed?: string[]
    saved?: string[]
  }
  setStudyplansLists: (
    callback: (studyplans: UserStore['studyplansLists']) => UserStore['studyplansLists']
  ) => void
}

export const useUserStore = create<UserStore>(set => ({
  studyplan: undefined,
  setStudyplan: value => set(() => ({ studyplan: value })),

  setTaskDone: (index, value) =>
    set(({ studyplan }) => {
      const newStudyplan = structuredClone(studyplan)
      if (!newStudyplan) return {}

      newStudyplan.daily_lessons[newStudyplan.current_day - 1].tasks[index].done = value
      return { studyplan: newStudyplan }
    }),

  studyplansLists: {},

  setStudyplansLists: callback =>
    set(({ studyplansLists: studyplans }) => {
      return { studyplansLists: callback({ ...studyplans }) }
    })
}))
