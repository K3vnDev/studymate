import { FONTS } from '@consts'
import { twMerge } from 'tailwind-merge'
import type { ReusableComponent } from '@types'

type Props = {
  size?: 1 | 2 | 3
  children: React.ReactNode
} & ReusableComponent

export const Paragraph = ({ size: s = 2, children, className = '', style }: Props) => {
  const sizes = ['text-sm', 'text-base', 'text-lg']

  return (
    <h3
      className={twMerge(`
        ${FONTS.INTER} text-gray-10 font-light ${sizes[s - 1]} 
        text-pretty ${className}
      `)}
      style={style}
    >
      {children}
    </h3>
  )
}
