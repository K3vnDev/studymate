import { twMerge } from 'tailwind-merge'

interface Props {
  className?: string
  style?: React.CSSProperties
}

export const TileStudyPlanFallback = ({ className = '', style }: Props) => (
  <li className={twMerge(`flex flex-col w-full gap-2 animate-pulse ${className}`)} style={style}>
    <div className='bg-zinc-600 w-full h-44 rounded-lg' />
    <span className='bg-zinc-700 w-full h-7 rounded-lg' />
    <span className='bg-zinc-700 w-[4.5rem] h-7 rounded-lg' />
  </li>
)
