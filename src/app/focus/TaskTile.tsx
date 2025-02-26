import { CheckIcon } from '@icons'

interface Props {
  done: boolean
  goal: string
}

export const TaskTile = ({ done, goal }: Props) => {
  const textStyle = done ? 'line-through italic text-white/75' : 'text-white'
  const bgStyle = done ? 'bg-gray-50' : 'bg-gray-60'

  return (
    <li
      className={`
        ${bgStyle} px-4 min-h-full max-h-full w-full flex md:gap-5 gap-2 items-center 
        shadow-card shadow-black/20 justify-between 
      `}
    >
      <span className={`${textStyle} text-pretty w-full`}>{goal}</span>

      <span className='h-full flex items-center justify-end'>
        {done && <CheckIcon className='text-blue-20 size-12 stroke-[2.5px]' />}
      </span>
    </li>
  )
}
