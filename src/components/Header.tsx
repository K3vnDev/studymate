import type { ReusableComponent } from '@types'
import { FONTS } from '@consts'
import { twMerge } from 'tailwind-merge'

type Props = {
  size?: 1 | 2 | 3
  children: React.ReactNode
} & ReusableComponent

export const Header = ({ size: s = 2, children, className = '', style }: Props) => {
  const sizes = ['text-xl', 'text-2xl', 'text-3xl']

  return (
    <h3
      className={twMerge(
        `${FONTS.POPPINS} text-white font-semibold ${sizes[s - 1]} 
        flex gap-3 items-center ${className}`
      )}
      style={style}
    >
      {children}
    </h3>
  )
}
