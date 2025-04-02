import { saveNewChatMessagesToDatabase } from '@/app/api/utils/saveNewChatMessagesToDabatase'
import { dataFetch } from '@/lib/utils/dataFetch'
import { saveChatToDatabase } from '@/lib/utils/saveChatToDatabase'
import { throwConfetti } from '@/lib/utils/throwConfetti'
import { useChatStore } from '@/store/useChatStore'
import { useStudyplansStore } from '@/store/useStudyplansStore'
import { useUserStore } from '@/store/useUserStore'
import { CONTENT_JSON } from '@consts'
import { useOnUser } from '@hooks/useOnUser'
import type { UserStudyplan } from '@types'
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
  const modifyStudyplansList = useUserStore(s => s.modifyStudyplansList)
  const stateStudyplan = useStudyplansStore(s => s.studyplan)
  const setChatStudyplanOriginalId = useChatStore(s => s.setStudyplanOriginalId)
  const chatMessages = useChatStore(s => s.messages)

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
      options: {
        method: 'POST',
        headers: CONTENT_JSON,
        body: JSON.stringify(stateStudyplan)
      },
      onSuccess: newStudyplan => {
        // Set the new studyplan as the user's current
        setUserStudyplan(newStudyplan)
        // Set the original_id in the state studyplan
        if (stateStudyplan && 'chat_message_id' in stateStudyplan && stateStudyplan.chat_message_id) {
          setChatStudyplanOriginalId(stateStudyplan.chat_message_id, newStudyplan.original_id, newMessages =>
            saveChatToDatabase(newMessages)
          )
        }
        // Go to the new studyplan page
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
            modifyStudyplansList(id, 'completed').add()
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
