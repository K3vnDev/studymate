import { twMerge } from 'tailwind-merge'

interface Props {
  children: React.ReactNode
  className?: string
}

export const Background = ({ children, className = 'bg-[#0C0C0C]' }: Props) => (
  <div
    className={twMerge(
      `${className} fixed top-0 left-0 w-screen h-screen -z-10 pointer-events-none overflow-hidden`
    )}
  >
    {children}
  </div>
)
