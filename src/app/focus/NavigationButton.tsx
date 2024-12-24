import { TasksContext } from '@/lib/context/TasksContext'
import { useContext } from 'react'

interface Props {
  index: number
}

export const NavigationButton = ({ index }: Props) => {
  const { tasks, swapTask, selectedTask, isLoading } = useContext(TasksContext)

  const handleClick = () => swapTask(index)
  const opacity = selectedTask === index ? 'opacity-60' : 'hover:opacity-25 opacity-15'
  const bgColor = tasks[index].done ? 'bg-blue-20' : 'bg-white/80'

  return (
    <button
      className={`size-3.5 rounded-full button relative ${opacity} ${bgColor}`}
      onClick={handleClick}
      disabled={isLoading}
    >
      <div className='absolute top-0 left-0 w-full h-full scale-[2]' />
    </button>
  )
}
