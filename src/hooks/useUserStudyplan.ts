import { CONTENT_JSON } from '@/consts'
import { dataFetch } from '@/lib/utils/dataFetch'
import { throwConfetti } from '@/lib/utils/throwConfetti'
import { useStudyplansStore } from '@/store/useStudyplansStore'
import { useUserStore } from '@/store/useUserStore'
import type { UserStudyplan } from '@/types.d'
import type { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { useOnUser } from './useOnUser'

interface Params {
  fetchOnAwake?: boolean
  redirectTo?: string
}

export const useUserStudyplan = (params?: Params) => {
  const userStudyplan = useUserStore(s => s.studyplan)
  const setUserStudyplan = useUserStore(s => s.setStudyplan)
  const addToCompletedList = useUserStore(s => s.addToCompletedList)
  const stateStudyplan = useStudyplansStore(s => s.studyplan)

  const onUser = useOnUser()
  const router = useRouter()

  // Initial fetch of user studyplan
  useEffect(() => {
    if (userStudyplan !== undefined || (params && params.fetchOnAwake === false)) return

    dataFetch<UserStudyplan | null>({
      url: '/api/user/studyplan',
      onSuccess: data => setUserStudyplan(data)
    })
  }, [])

  // Redirect the user in case there's no studyplan
  useEffect(() => {
    if (userStudyplan === null && params?.redirectTo) {
      router.replace(params.redirectTo)
    }
  }, [userStudyplan])

  const getUtilityValues = () => {
    if (userStudyplan) {
      const { daily_lessons, current_day } = userStudyplan

      const todaysTasks = daily_lessons[current_day - 1].tasks
      const isOnLastDay = daily_lessons.length === current_day
      const allTasksAreCompleted = daily_lessons.every(d => d.tasks.every(t => t.done))

      return { todaysTasks, isOnLastDay, allTasksAreCompleted }
    }
    return null
  }

  const start = () =>
    dataFetchHandler<UserStudyplan>({
      url: '/api/user/studyplan',
      options: { method: 'POST', headers: CONTENT_JSON, body: JSON.stringify(stateStudyplan) },
      onSuccess: data => {
        setUserStudyplan(data)
        onUser({ stayed: () => router.replace('/studyplan') })
      }
    })

  const abandon = () =>
    dataFetchHandler({
      url: '/api/user/studyplan',
      options: { method: 'DELETE' },
      onSuccess: () =>
        onUser({
          stayed: () => seeOriginal('replace'),
          gone: () => setUserStudyplan(null)
        })
    })

  const finish = () =>
    dataFetchHandler<string>({
      url: '/api/user/studyplan',
      options: { method: 'PUT' },
      onSuccess: id =>
        onUser({
          stayed: () => seeOriginal('replace'),
          afterTimeout: throwConfetti,
          gone: () => {
            setUserStudyplan(null)
            addToCompletedList(id)
          }
        })
    })

  const seeOriginal = (method: keyof AppRouterInstance = 'push') => {
    if (userStudyplan) {
      const { original_id } = userStudyplan
      router[method](`/studyplan/${original_id}`)
    }
  }

  return {
    userStudyplan: userStudyplan ?? null,
    isLoading: userStudyplan === undefined,
    getUtilityValues,

    startStudyplan: start,
    abandonStudyplan: abandon,
    finishStudyplan: finish,
    seeOriginalStudyplan: seeOriginal
  }
}

interface DataFetchHandlerParams<T> {
  url: string
  options?: RequestInit
  onSuccess?: (data: T) => void
}

const dataFetchHandler = <T>({ url, options, onSuccess }: DataFetchHandlerParams<T>) =>
  new Promise<void>(res => {
    dataFetch<T>({ url, options, onSuccess, onFinish: res })
  })
