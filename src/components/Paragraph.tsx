import { FONTS } from '@/consts'

interface Props {
  className?: string
  s?: 1 | 2 | 3
  children: React.ReactNode
}

export const Paragraph = ({ className = '', s = 2, children }: Props) => {
  const sizes = ['text-sm', 'text-base', 'text-lg']

  return (
    <h3 className={`${FONTS.INTER} text-gray-10 font-light ${sizes[s - 1]} ${className} text-pretty`}>
      {children}
    </h3>
  )
}
