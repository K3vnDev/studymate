import { dataFetch } from '@/lib/utils/dataFetch'
import { useUserStore } from '@/store/useUserStore'
import type { UserStudyplan } from '@/types.d'
import { useEffect } from 'react'

export const useUserStudyplan = () => {
  const userStudyplan = useUserStore(s => s.studyplan)
  const setUserStudyplan = useUserStore(s => s.setStudyplan)

  useEffect(() => {
    if (userStudyplan !== undefined) return

    dataFetch<UserStudyplan | null>({
      url: '/api/user/studyplan',
      onSuccess: data => {
        setUserStudyplan(data)
      }
    })
  }, [])

  return [userStudyplan ?? null, userStudyplan === undefined] as const
}
