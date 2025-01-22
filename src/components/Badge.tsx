import { FONTS } from '@consts'

interface Props {
  children: React.ReactNode
  className?: string
}

export const Badge = ({ children, className = '' }: Props) => (
  <span className={`text-blue-20 text-base ${FONTS.INTER} font-semibold ${className}`}>{children}</span>
)
