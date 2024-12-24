import { TasksContext } from '@/lib/context/TasksContext'
import { useContext } from 'react'

interface Props {
  index: number
}

export const NavigationButton = ({ index }: Props) => {
  const { swapTask, selectedTask } = useContext(TasksContext)

  const handleClick = () => swapTask(index)
  const bgColor = selectedTask === index ? 'bg-white/60' : 'bg-white/15 hover:bg-white/25'

  return (
    <button className={`size-3.5 rounded-full button relative ${bgColor}`} onClick={handleClick}>
      <div className='absolute top-0 left-0 w-full h-full scale-[2]' />
    </button>
  )
}
