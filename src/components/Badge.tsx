import { FONTS } from '@/consts'

interface Props {
  children: React.ReactNode
}

export const Badge = ({ children }: Props) => (
  <span className={`text-[#6168E8] text-base ${FONTS.INTER} font-semibold`}>{children}</span>
)
