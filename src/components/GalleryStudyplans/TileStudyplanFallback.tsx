import { twMerge } from 'tailwind-merge'
import { FallbackBox } from '../FallbackBox'

interface Props {
  className?: string
  style?: React.CSSProperties
}

export const TileStudyPlanFallback = ({ className = '', style }: Props) => (
  <li
    className={twMerge(`
      flex flex-col w-full h-[var(--studyplan-tile-height)] 
      gap-2 animate-pulse ${className}
    `)}
    style={style}
  >
    <FallbackBox className='w-full h-full' />
    <FallbackBox className='bg-zinc-700 w-full h-8' />
    <FallbackBox className='bg-zinc-700 w-[4.5rem] h-8' />
  </li>
)
