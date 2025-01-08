import { ChipButton } from '@/components/ChipButton'
import { useJustLoaded } from '@/hooks/useJustLoaded'
import { useUserPrompts } from '@/hooks/useUserPrompts'
import { TasksContext } from '@/lib/context/TasksContext'
import { ArrowIcon, CheckIcon, MagicWandIcon, RocketIcon } from '@icons'
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
    if (isOnLastDay) {
      router.push('/studyplan')
      return
    }
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
  const justLoaded = useJustLoaded(500, [selectedTask])

  return (
    <ChipButton onClick={completeTask} disabled={justLoaded} isLoading={isLoading}>
      <CheckIcon className='stroke-[3px]' /> I'm done
    </ChipButton>
  )
}
