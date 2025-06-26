import { FONTS } from '@consts'
import { twMerge } from 'tailwind-merge'

interface Props {
  children: React.ReactNode
  className?: string
}

export const Badge = ({ children, className = '' }: Props) => (
  <span className={twMerge(`text-blue-20 text-base ${FONTS.INTER} font-semibold ${className}`)}>
    {children}
  </span>
)
