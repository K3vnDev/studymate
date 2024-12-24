import { ChipButton } from '@/components/ChipButton'
import { ArrowIcon, CheckIcon, MagicWandIcon } from '@/components/icons'
import { TasksContext } from '@/lib/context/TasksContext'
import { useContext } from 'react'

export const Buttons = () => {
  const { selectedTaskIsDone } = useContext(TasksContext)

  return (
    <div className='flex gap-2 self-end'>
      {selectedTaskIsDone ? (
        <ChipButton>
          <ArrowIcon className='-rotate-90' />
          Next task
        </ChipButton>
      ) : (
        <>
          <ChipButton empty>
            <MagicWandIcon /> Explain this task
          </ChipButton>
          <ChipButton>
            <CheckIcon className='stroke-[3px]' /> I'm done
          </ChipButton>
        </>
      )}
    </div>
  )
}
