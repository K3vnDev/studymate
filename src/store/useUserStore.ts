import type { UserStudyplan } from '@/types.d'
import { create } from 'zustand'

export interface UserStore {
  studyplan: UserStudyplan | null
  setStudyplan: (value: UserStudyplan | null) => void
}

export const useUserStore = create<UserStore>(set => ({
  studyplan: null,
  setStudyplan: value => set(() => ({ studyplan: value }))
}))
