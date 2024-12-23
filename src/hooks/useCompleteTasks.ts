import { CONTENT_JSON } from '@/consts'
import { dataFetch } from '@/lib/utils/dataFetch'
import { useEffect, useRef, useState } from 'react'

interface ToCompleteTask {
  index: number
  onErrorCallback: () => void
}

export const useCompleteTasks = () => {
  const [toCompleteTasks, setToCompleteTasks] = useState<ToCompleteTask[]>([])
  const timeout = useRef<NodeJS.Timeout>()

  const WAIT_TIME = 400

  useEffect(() => {
    if (toCompleteTasks.length === 0) return

    timeout.current = setTimeout(() => {
      const indexes = toCompleteTasks.map(({ index }) => index)

      dataFetch({
        url: '/api/user/studyplan/tasks',
        options: {
          method: 'POST',
          headers: CONTENT_JSON,
          body: JSON.stringify(indexes)
        },
        onError: () => {
          toCompleteTasks.forEach(t => {
            t.onErrorCallback()
          })
          setToCompleteTasks([])
        }
      })
    }, WAIT_TIME)

    return () => {
      clearTimeout(timeout.current)
    }
  }, [toCompleteTasks])

  const completeTask = (index: number, onErrorCallback: () => void) => {
    if (toCompleteTasks.some(t => t.index === index)) return
    setToCompleteTasks(t => [{ index, onErrorCallback }, ...t])
  }

  return { completeTask }
}
