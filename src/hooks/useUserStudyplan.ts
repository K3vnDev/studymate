import { dataFetch } from '@/lib/utils/dataFetch'
import { useUserStore } from '@/store/useUserStore'
import type { UserStudyplan } from '@/types.d'
import type { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime'
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
      onSuccess: () => setUserStudyplan(null)
    })
  }

  const navigateToOriginal = (method: keyof AppRouterInstance = 'push') => {
    if (!userStudyplan) return
    const { original_id } = userStudyplan

    router[method](`/studyplan/${original_id}`)
  }

  const getUtilityValues = () => {
    if (userStudyplan) {
      const { daily_lessons, current_day } = userStudyplan

      return {
        todaysTasks: daily_lessons[current_day - 1].tasks,
        isOnLastDay: daily_lessons.length === current_day,
        allTasksAreCompleted: daily_lessons.every(d => d.tasks.every(t => t.done))
      }
    }
    return null
  }

  return {
    userStudyplan: userStudyplan ?? null,
    isLoading: userStudyplan === undefined,
    getUtilityValues,
    abandonStudyplan,
    navigateToOriginal
  }
}
