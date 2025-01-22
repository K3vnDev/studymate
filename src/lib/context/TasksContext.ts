import type { UserStudyplan } from '@types'
import { createContext } from 'react'

interface TasksContext {
  tasks: UserStudyplan['daily_lessons'][number]['tasks']
  selectedTask: number
  selectedTaskIsDone: boolean
  allTasksAreDone: boolean
  isOnLastDay: boolean
  swapTask: (index: number) => void
  completeTask: () => void
  isLoading: boolean
}

export const TasksContext = createContext<TasksContext>({
  tasks: [],
  selectedTask: 0,
  selectedTaskIsDone: false,
  allTasksAreDone: false,
  swapTask: () => {},
  isOnLastDay: false,
  completeTask: () => {},
  isLoading: false
})
