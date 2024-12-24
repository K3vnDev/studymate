import { CheckIcon } from '@/components/icons'

interface Props {
  done: boolean
  goal: string
}

export const Task = ({ done, goal }: Props) => {
  const [lineThrough, bgColor] = done ? ['line-through', 'bg-gray-50'] : ['', 'bg-gray-60']

  return (
    <li
      className={`
        ${bgColor} px-4 min-h-full max-h-full w-full flex items-center 
        shadow-card shadow-black/20 justify-between 
      `}
    >
      <span className={`text-white text-pretty ${lineThrough}`}>{goal}</span>
      <span className='h-full aspect-square flex items-center justify-end'>
        {done && <CheckIcon className='text-blue-20 size-12' />}
      </span>
    </li>
  )
}
