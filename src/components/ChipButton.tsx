'use client'

interface Props {
  children: React.ReactNode
  onClick?: () => void
  empty?: boolean
  disabled?: boolean
  className?: string
}

export const ChipButton = ({ children, onClick, empty, disabled = false, className = '' }: Props) => {
  const style = empty
    ? 'bg-transparent border-blue-10 text-blue-10'
    : 'bg-blue-30 border-[#6168E8] text-white'

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (onClick) onClick()
  }

  return (
    <button
      className={`
        ${className} ${style} border rounded-full py-1 px-5 font-medium text-lg button 
        flex gap-2 items-center *:size-6 text-nowrap
      `}
      onClick={handleClick}
      disabled={disabled}
    >
      {children}
    </button>
  )
}
