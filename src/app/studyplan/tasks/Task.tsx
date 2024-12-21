import { ChipButton } from '@/components/ChipButton'
import { CheckIcon, RocketIcon } from '@/components/icons'
import { FONTS } from '@/consts'
import type { UserStudyplan } from '@/types.d'
import { useState } from 'react'

type Props = {
  index: number
  completeTask: (index: number, onErrorCallback: () => void) => void
} & UserStudyplan['daily_lessons'][number]['tasks'][number]

export const Task = ({ goal, done, index, completeTask }: Props) => {
  const [isDone, setIsDone] = useState(done)

  const handleClick = () => {
    completeTask(index, () => {
      setIsDone(false)
    })
    setIsDone(true)
  }

  const [text, background] = isDone
    ? ['line-through text-gray-10', 'bg-gray-50/50']
    : ['text-white', 'bg-gray-40/75']

  return (
    <div
      className={`${background} flex items-center gap-4 px-8 h-20 justify-between w-full rounded-lg`}
    >
      <span className={`${FONTS.INTER} ${text}`}>{goal}</span>

      {isDone ? (
        <CheckIcon className='size-[3.25rem] stroke-[2.5px] text-blue-20' />
      ) : (
        <ChipButton empty onClick={handleClick}>
          <RocketIcon /> Start
        </ChipButton>
      )}
    </div>
  )
}
