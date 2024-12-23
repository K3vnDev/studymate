import { dataFetch } from '@/lib/utils/dataFetch'
import { useUserStore } from '@/store/useUserStore'
import type { UserStudyplan } from '@/types.d'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

interface Params {
  fetchOnAwake?: boolean
  redirectTo?: string
}

export const useUserStudyplan = (params?: Params) => {
  const userStudyplan = useUserStore(s => s.studyplan)
  const setUserStudyplan = useUserStore(s => s.setStudyplan)
  const router = useRouter()

  useEffect(() => {
    if (userStudyplan !== undefined || (params && params.fetchOnAwake === false)) return

    dataFetch<UserStudyplan | null>({
      url: '/api/user/studyplan',
      onSuccess: data => setUserStudyplan(data)
    })
  }, [])

  useEffect(() => {
    if (userStudyplan === null && params?.redirectTo) {
      router.replace(params.redirectTo)
    }
  }, [userStudyplan])

  const abandonStudyplan = () => {
    dataFetch({
      url: '/api/user/studyplan',
      options: { method: 'DELETE' },
      onSuccess: () => {
        setUserStudyplan(null)
      }
    })
  }

  const navigateToOriginal = () => {
    if (!userStudyplan) return
    const { original_id } = userStudyplan
    router.push(`/studyplan/${original_id}`)
  }

  return {
    userStudyplan: userStudyplan ?? null,
    isLoading: userStudyplan === undefined,
    abandonStudyplan,
    navigateToOriginal
  }
}
