import type { UserStudyplan } from '@/types.d'
import { create } from 'zustand'

export interface UserStore {
  studyplan: UserStudyplan | null | undefined
  setStudyplan: (studyplan: UserStudyplan | null) => void
}

export const useUserStore = create<UserStore>(set => ({
  studyplan: undefined,
  setStudyplan: value => set(() => ({ studyplan: value }))
}))
