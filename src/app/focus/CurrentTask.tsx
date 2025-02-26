'use client'

import { TasksContext } from '@/lib/context/TasksContext'
import { dataFetch } from '@/lib/utils/dataFetch'
import { useUserStore } from '@/store/useUserStore'
import { Badge } from '@components/Badge'
import { CONTENT_JSON } from '@consts'
import { useVerticalNavigation } from '@hooks/useVerticalNavigation'
import type { UserStudyplan } from '@types'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { Buttons } from './Buttons'
import { TaskTile } from './TaskTile'
import { TasksNavigation } from './TasksNavigation'

interface Props {
  todaysTasks: UserStudyplan['daily_lessons'][number]['tasks']
  isOnLastDay: boolean
}

export const CurrentTask = ({ todaysTasks: tasks, isOnLastDay }: Props) => {
  const [selectedTask, setSelectedTask] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const [isShowingCompletedMessage, setIsShowingCompletedMessage] = useState(false)

  const ulRef = useRef<HTMLUListElement>(null)
  const setTaskDone = useUserStore(s => s.setTaskDone)
  const router = useRouter()

  const allTasksAreDone = tasks.every(t => t.done)
  const searchParams = useSearchParams()

  // Load task recieved on query params
  useEffect(() => {
    const taskIndex = Number(searchParams.get('task'))

    if (taskIndex && !Number.isNaN(taskIndex) && taskIndex <= tasks.length) {
      swapTask(taskIndex - 1, 'instant')
    }
    setIsShowingCompletedMessage(allTasksAreDone)
  }, [])

  const swapTask = (index: number, behavior: ScrollBehavior = 'smooth') => {
    if (!ulRef.current) return

    const { height } = ulRef.current.getBoundingClientRect()
    ulRef.current.scrollTo({ top: height * index - 2, behavior })

    setSelectedTask(index)
    router.replace(`/focus?task=${selectedTask}`)
  }

  const completeTask = () => {
    setIsLoading(true)

    dataFetch({
      url: '/api/user/studyplan/tasks',
      options: {
        method: 'POST',
        headers: CONTENT_JSON,
        body: JSON.stringify({ index: selectedTask })
      },
      onSuccess: () => setTaskDone(selectedTask, true),
      onFinish: () => setIsLoading(false)
    })
  }

  useVerticalNavigation({
    currentIndex: selectedTask,
    maxIndex: tasks.length - 1,
    action: newIndex => swapTask(newIndex)
  })

  return !isShowingCompletedMessage ? (
    <TasksContext.Provider
      value={{
        tasks,
        selectedTask,
        selectedTaskIsDone: tasks[selectedTask].done,
        allTasksAreDone,
        isOnLastDay,
        swapTask,
        completeTask,
        isLoading
      }}
    >
      <article
        className={`
          flex bg-card-background border border-card-border 
          rounded-2xl xs:px-7 px-5 xs:py-6 py-5 md:gap-7 gap-4 max-w-[40rem] w-full animate-fade-in-fast
        `}
      >
        <main className='flex flex-col gap-3 w-full'>
          <Badge>CURRENT TASK</Badge>
          <ul
            className='w-full flex flex-col h-20 overflow-hidden rounded-lg border border-gray-50'
            ref={ulRef}
          >
            {tasks.map((task, i) => (
              <TaskTile {...task} key={i} />
            ))}
          </ul>
          <Buttons />
        </main>
        <TasksNavigation />
      </article>
    </TasksContext.Provider>
  ) : (
    <span className='text-lg text-white/50 text-center mb-1 animate-fade-in-fast text-balance'>
      You have completed all your tasks of today,{' '}
      <span className='font-semibold text-white/75'>Good job! 🎉</span>
    </span>
  )
}
