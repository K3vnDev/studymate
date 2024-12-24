import { createContext } from 'react'

export const TasksContext = createContext({
  selectedTask: 0,
  selectedTaskIsDone: false,
  swapTask: (index: number) => {}
})
