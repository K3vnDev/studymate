import { FONTS } from '@/consts'

interface Props {
  className?: string
  children: React.ReactNode
}

export const Header1 = ({ children, className = '' }: Props) => (
  <h3
    className={`${FONTS.POPPINS} text-white font-semibold text-2xl flex gap-3 items-center ${className}`}
  >
    {children}
  </h3>
)
