import type { ReusableComponent } from '@types'
import { twMerge } from 'tailwind-merge'

type Props = {
  children: React.ReactNode
} & ReusableComponent

export const Background = ({ children, className = '', style }: Props) => (
  <div
    className={twMerge(`
      fixed top-0 left-0 w-screen h-screen -z-10 
      pointer-events-none overflow-hidden bg-[#0C0C0C] ${className}
    `)}
    style={style}
  >
    {children}
  </div>
)
