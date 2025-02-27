import { useResponsiveness } from '@/hooks/useResponsiveness'
import { TasksContext } from '@/lib/context/TasksContext'
import { ChipButton } from '@components/ChipButton'
import { SCREENS } from '@consts'
import { useJustLoaded } from '@hooks/useJustLoaded'
import { useUserPrompts } from '@hooks/useUserPrompts'
import { ArrowIcon, CheckIcon, MagicWandIcon, RocketIcon } from '@icons'
import { useRouter } from 'next/navigation'
import { useContext } from 'react'

export const Buttons = () => {
  const { selectedTaskIsDone } = useContext(TasksContext)

  return (
    <div className='flex gap-2 self-end'>
      {selectedTaskIsDone ? (
        <ProceedButton />
      ) : (
        <>
          <ExplainTaskButton />
          <CompleteTaskButton />
        </>
      )}
    </div>
  )
}

const ExplainTaskButton = () => {
  const prompts = useUserPrompts({ redirect: true })
  const { isLoading } = useContext(TasksContext)

  const { screenSize } = useResponsiveness()
  const buttonLabel = screenSize.x >= SCREENS.XS ? 'Explain this task' : 'Explain'

  return (
    <ChipButton empty disabled={isLoading} onClick={prompts.explainTasks}>
      <MagicWandIcon /> {buttonLabel}
    </ChipButton>
  )
}

const ProceedButton = () => {
  const { tasks, allTasksAreDone, swapTask, isOnLastDay } = useContext(TasksContext)
  const router = useRouter()

  const handleFinishDay = () => {
    if (isOnLastDay) {
      router.replace('/studyplan')
      return
    }
    router.replace('/studyplan/tasks')
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
  const justLoaded = useJustLoaded(400, [selectedTask])

  const { screenSize } = useResponsiveness()
  const buttonLabel = screenSize.x >= SCREENS.XS ? "I'm done" : 'Done'

  return (
    <ChipButton onClick={completeTask} disabled={justLoaded || isLoading} isLoading={isLoading}>
      <CheckIcon className='stroke-[3px]' /> {buttonLabel}
    </ChipButton>
  )
}
