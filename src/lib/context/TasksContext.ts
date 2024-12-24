import type { UserStudyplan } from '@/types.d'
import { createContext } from 'react'

interface TasksContext {
  tasks: UserStudyplan['daily_lessons'][number]['tasks']
  selectedTask: number
  selectedTaskIsDone: boolean
  swapTask: (index: number) => void
  completeTask: () => void
  isLoading: boolean
}

export const TasksContext = createContext<TasksContext>({
  tasks: [],
  selectedTask: 0,
  selectedTaskIsDone: false,
  swapTask: () => {},
  completeTask: () => {},
  isLoading: false
})
