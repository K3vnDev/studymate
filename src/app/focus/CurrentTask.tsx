'use client'

import { Badge } from '@/components/Badge'
import { CONTENT_JSON } from '@/consts'
import { useVerticalNavigation } from '@/hooks/useVerticalNavigation'
import { TasksContext } from '@/lib/context/TasksContext'
import { dataFetch } from '@/lib/utils/dataFetch'
import { useUserStore } from '@/store/useUserStore'
import type { UserStudyplan } from '@/types.d'
import { useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { Buttons } from './Buttons'
import { NavigationButton } from './NavigationButton'
import { Task } from './Task'

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

  // Load task recieved on query params
  useEffect(() => {
    if (typeof window === 'undefined') return
    const url = new URL(window.location.href)
    const taskIndex = Number(url.searchParams.get('task'))

    if (taskIndex && !Number.isNaN(taskIndex) && taskIndex <= tasks.length) {
      swapTask(taskIndex - 1)
    }

    setIsShowingCompletedMessage(allTasksAreDone)
  }, [])

  const swapTask = (index: number) => {
    if (!ulRef.current) return

    const { height } = ulRef.current.getBoundingClientRect()
    ulRef.current.scrollTo({ top: height * index - 2, behavior: 'smooth' })

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
      onSuccess: () => {
        setTaskDone(selectedTask, true)
        setIsLoading(false)
      }
    })
  }

  useVerticalNavigation({
    currentIndex: selectedTask,
    maxIndex: tasks.length - 1,
    action: newIndex => swapTask(newIndex)
  })

  const asideGap = tasks.length < 4 ? 'gap-5' : tasks.length < 6 ? 'gap-4' : 'gap-2'

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
          rounded-2xl px-7 py-6 gap-7 w-[40rem] animate-fade-in-fast
        `}
      >
        <main className='flex flex-col gap-3 w-full'>
          <Badge>CURRENT TASK</Badge>

          <ul
            className='w-full flex flex-col h-20 overflow-hidden rounded-lg border border-gray-50'
            ref={ulRef}
          >
            {tasks.map((task, i) => (
              <Task {...task} key={i} />
            ))}
          </ul>

          <Buttons />
        </main>
        <aside className={`w-4 h-full flex flex-col justify-center ${asideGap}`}>
          {tasks.map((_, index) => (
            <NavigationButton key={index} index={index} />
          ))}
        </aside>
      </article>
    </TasksContext.Provider>
  ) : (
    <span className='text-lg text-white/50 text-center mb-1 animate-fade-in-fast'>
      You have completed all your tasks of today, Good job!
    </span>
  )
}
