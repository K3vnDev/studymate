import { CONTENT_JSON } from '@/consts'
import { dataFetch } from '@/lib/utils/dataFetch'
import { throwConfetti } from '@/lib/utils/throwConfetti'
import { useStudyplansStore } from '@/store/useStudyplansStore'
import { useUserStore } from '@/store/useUserStore'
import type { UserStudyplan } from '@/types.d'
import type { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime'
import { useRouter } from 'next/navigation'
import { useEffect, useRef } from 'react'

interface Params {
  fetchOnAwake?: boolean
  redirectTo?: string
}

export const useUserStudyplan = (params?: Params) => {
  const userStudyplan = useUserStore(s => s.studyplan)
  const setUserStudyplan = useUserStore(s => s.setStudyplan)
  const addToCompletedList = useUserStore(s => s.addToCompletedList)
  const stateStudyplan = useStudyplansStore(s => s.studyplan)

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

  // Check if the user has left the current route
  useEffect(() => {
    userHasLeft.current = false
    return () => {
      userHasLeft.current = true
    }
  }, [])
  const userHasLeft = useRef(false)

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
    new Promise<void>(res => {
      const onSuccess = (data: UserStudyplan) => {
        setUserStudyplan(data)
        onUser({ stayed: () => router.replace('/studyplan') })
      }

      dataFetch<UserStudyplan>({
        url: '/api/user/studyplan',
        options: { method: 'POST', headers: CONTENT_JSON, body: JSON.stringify(stateStudyplan) },
        onSuccess,
        onFinish: res
      })
    })

  const abandon = () =>
    new Promise<void>(res => {
      const onSuccess = () =>
        onUser({
          stayed: () => seeOriginal('replace'),
          gone: () => setUserStudyplan(null)
        })

      dataFetch({
        url: '/api/user/studyplan',
        options: { method: 'DELETE' },
        onSuccess,
        onFinish: res
      })
    })

  const finish = () =>
    new Promise<void>(res => {
      const onSuccess = (id: string) => {
        addToCompletedList(id)

        onUser({
          stayed: () => seeOriginal('replace'),
          afterTimeout: throwConfetti,
          gone: () => setUserStudyplan(null)
        })
      }

      dataFetch<string>({
        url: '/api/user/studyplan',
        options: { method: 'PUT' },
        onSuccess,
        onFinish: res
      })
    })

  const seeOriginal = (method: keyof AppRouterInstance = 'push') => {
    if (!userStudyplan) return
    const { original_id } = userStudyplan

    router[method](`/studyplan/${original_id}`)
  }

  // Offers different actions based on user staying or leaving the current route
  const onUser = ({ gone = () => {}, stayed = () => {}, afterTimeout = () => {}, waitTime = 650 }) => {
    if (!userHasLeft.current) {
      stayed()
      setTimeout(() => {
        afterTimeout()
        gone()
      }, waitTime)
    } else gone()
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
