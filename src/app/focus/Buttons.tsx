import { ChipButton } from '@/components/ChipButton'
import { ArrowIcon, CheckIcon, LoadingIcon, MagicWandIcon, RocketIcon } from '@/components/icons'
import { useUserPrompts } from '@/hooks/useUserPrompts'
import { TasksContext } from '@/lib/context/TasksContext'
import { useRouter } from 'next/navigation'
import { useContext, useEffect, useRef, useState } from 'react'

export const Buttons = () => {
  const { selectedTaskIsDone, isLoading } = useContext(TasksContext)
  const prompts = useUserPrompts()

  return (
    <div className='flex gap-2 self-end'>
      {selectedTaskIsDone ? (
        <ProceedButton />
      ) : (
        <>
          <ChipButton empty disabled={isLoading} onClick={prompts.blank}>
            <MagicWandIcon /> Explain this task
          </ChipButton>

          <CompleteTaskButton />
        </>
      )}
    </div>
  )
}

const ProceedButton = () => {
  const { tasks, allTasksAreDone, swapTask, isOnLastDay } = useContext(TasksContext)
  const router = useRouter()

  const handleFinishDay = () => {
    router.push('/studyplan/tasks')
  }

  const handleNextTask = () => {
    const nextNotDoneTaskIndex = tasks.findIndex(t => !t.done)
    if (nextNotDoneTaskIndex === -1) return

    swapTask(nextNotDoneTaskIndex)
  }

  if (allTasksAreDone) {
    return (
      <ChipButton onClick={handleFinishDay}>
        <RocketIcon /> Finish this day
      </ChipButton>
    )
  }

  return (
    <ChipButton onClick={handleNextTask}>
      <ArrowIcon className='[rotate:-90deg] animate-bounce' /> Next task
    </ChipButton>
  )
}

const CompleteTaskButton = () => {
  const { selectedTask, completeTask, isLoading } = useContext(TasksContext)
  const [justLoaded, setJustLoaded] = useState(true)
  const timeout = useRef<NodeJS.Timeout>()

  const WAIT_TIME = 500

  useEffect(() => {
    setJustLoaded(true)
    timeout.current = setTimeout(() => {
      setJustLoaded(false)
    }, WAIT_TIME)
    return () => clearTimeout(timeout.current)
  }, [selectedTask])

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
