import { ChipButton } from '@/components/ChipButton'
import { CheckIcon, RocketIcon } from '@/components/icons'
import { FONTS } from '@/consts'
import { useRouter } from 'next/navigation'

type Props = {
  index: number
  goal: string
  done: boolean
}

export const Task = ({ goal, done, index }: Props) => {
  const router = useRouter()

  const handleClick = () => {
    router.push(`/focus?task=${index + 1}`)
  }

  const [text, background] = done
    ? ['line-through text-gray-10', 'bg-gray-50/50']
    : ['text-white', 'bg-gray-40/75']

  return (
    <div
      className={`
        ${background} flex items-center gap-4 px-8 h-20 justify-between w-full rounded-lg 
        shadow-card shadow-black/15 card
      `}
      onClick={handleClick}
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
