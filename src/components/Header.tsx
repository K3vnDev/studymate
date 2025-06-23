import { FONTS } from '@consts'

interface Props {
  className?: string
  size?: 1 | 2 | 3
  children: React.ReactNode
}

export const Header = ({ className = '', size: s = 2, children }: Props) => {
  const sizes = ['text-xl', 'text-2xl', 'text-3xl']

  return (
    <h3
      className={`${FONTS.POPPINS} text-white font-semibold ${sizes[s - 1]} flex gap-3 items-center ${className}`}
    >
      {children}
    </h3>
  )
}
