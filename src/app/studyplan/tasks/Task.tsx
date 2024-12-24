import { ChipButton } from '@/components/ChipButton'
import { CheckIcon, RocketIcon } from '@/components/icons'
import { FONTS } from '@/consts'
import { useUserStore } from '@/store/useUserStore'
import type { UserStudyplan } from '@/types.d'

type Props = {
  index: number
  completeTask: (index: number, onErrorCallback: () => void) => void
} & UserStudyplan['daily_lessons'][number]['tasks'][number]

export const Task = ({ goal, done, index, completeTask }: Props) => {
  const setTaskDone = useUserStore(s => s.setTaskDone)

  const handleClick = () => {
    completeTask(index, () => setTaskDone(index, false))
    setTaskDone(index, true)
  }

  const [text, background] = done
    ? ['line-through text-gray-10', 'bg-gray-50/50']
    : ['text-white', 'bg-gray-40/75']

  return (
    <div
      className={`${background} flex items-center gap-4 px-8 h-20 justify-between w-full rounded-lg shadow-card shadow-black/15 card`}
    >
      <span className={`${FONTS.INTER} ${text}`}>{goal}</span>

      {done ? (
        <CheckIcon className='size-[3.25rem] stroke-[2.5px] text-blue-20' />
      ) : (
        <ChipButton empty onClick={handleClick}>
          <RocketIcon /> Start
        </ChipButton>
      )}
    </div>
  )
}
