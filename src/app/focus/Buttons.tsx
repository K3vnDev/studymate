import { ChipButton } from '@/components/ChipButton'
import { ArrowIcon, CheckIcon, LoadingIcon, MagicWandIcon } from '@/components/icons'
import { TasksContext } from '@/lib/context/TasksContext'
import { useContext, useEffect, useRef, useState } from 'react'

export const Buttons = () => {
  const { tasks, selectedTaskIsDone, swapTask, isLoading } = useContext(TasksContext)

  const handleNextTask = () => {
    const nextNotDoneTaskIndex = tasks.findIndex(t => !t.done)
    if (nextNotDoneTaskIndex === -1) return

    swapTask(nextNotDoneTaskIndex)
  }

  return (
    <div className='flex gap-2 self-end'>
      {selectedTaskIsDone ? (
        <ChipButton onClick={handleNextTask}>
          <ArrowIcon className='-rotate-90' />
          Next task
        </ChipButton>
      ) : (
        <>
          <ChipButton empty disabled={isLoading}>
            <MagicWandIcon /> Explain this task
          </ChipButton>

          <CompleteTaskButton />
        </>
      )}
    </div>
  )
}

const CompleteTaskButton = () => {
  const { completeTask, isLoading } = useContext(TasksContext)
  const [justLoaded, setJustLoaded] = useState(true)
  const timeout = useRef<NodeJS.Timeout>()

  const WAIT_TIME = 900

  useEffect(() => {
    timeout.current = setTimeout(() => {
      setJustLoaded(false)
    }, WAIT_TIME)
    return () => clearTimeout(timeout.current)
  }, [])

  return (
    <ChipButton onClick={completeTask} disabled={isLoading || justLoaded}>
      {
        // biome-ignore format: <>
        !isLoading 
        ? <CheckIcon className='stroke-[3px]' /> 
        : <LoadingIcon className='animate-spin' />
      }
      I'm done
    </ChipButton>
  )
}
