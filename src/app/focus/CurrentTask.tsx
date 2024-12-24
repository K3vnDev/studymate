import { Badge } from '@/components/Badge'
import { TasksContext } from '@/lib/context/TasksContext'
import type { UserStudyplan } from '@/types.d'
import { useRef, useState } from 'react'
import { Buttons } from './Buttons'
import { NavigationButton } from './NavigationButton'
import { Task } from './Task'

interface Props {
  tasks: UserStudyplan['daily_lessons'][number]['tasks']
}

export const CurrentTask = ({ tasks }: Props) => {
  const ulRef = useRef<HTMLUListElement>(null)

  const [selectedTask, setSelectedTask] = useState(0)

  const swapTask = (index: number) => {
    if (ulRef.current) {
      const { height } = ulRef.current.getBoundingClientRect()
      ulRef.current.scrollTo({ top: height * index, behavior: 'smooth' })

      setSelectedTask(index)
    }
  }

  return (
    <TasksContext.Provider
      value={{
        selectedTask,
        swapTask,
        selectedTaskIsDone: tasks[selectedTask].done
      }}
    >
      <article
        className={`
          flex bg-card-background border border-card-border 
          rounded-2xl px-7 py-6 gap-7 w-[40rem]
        `}
      >
        <main className='flex flex-col gap-5 w-full'>
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
        <aside className='w-4 h-full flex flex-col justify-center gap-5'>
          {tasks.map((_, index) => (
            <NavigationButton key={index} index={index} />
          ))}
        </aside>
      </article>
    </TasksContext.Provider>
  )
}
