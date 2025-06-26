import { FONTS } from '@consts'
import { twMerge } from 'tailwind-merge'

interface Props {
  className?: string
  size?: 1 | 2 | 3
  children: React.ReactNode
}

export const Paragraph = ({ className = '', size: s = 2, children }: Props) => {
  const sizes = ['text-sm', 'text-base', 'text-lg']

  return (
    <h3
      className={twMerge(`${FONTS.INTER} text-gray-10 font-light ${sizes[s - 1]} text-pretty ${className}`)}
    >
      {children}
    </h3>
  )
}
