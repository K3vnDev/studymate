import { FONTS } from '@/consts'

interface Props {
  children: React.ReactNode
}

export const Header1 = ({ children }: Props) => (
  <h3 className={`${FONTS.POPPINS} text-white font-semibold text-2xl`}>{children}</h3>
)
