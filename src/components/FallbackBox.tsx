import { twMerge } from 'tailwind-merge'

interface Props {
  style?: React.CSSProperties
  className?: string
}

export const FallbackBox = ({ style, className = '' }: Props) => (
  <div className={twMerge(`bg-zinc-600 rounded-lg animate-pulse ${className}`)} style={style} />
)
