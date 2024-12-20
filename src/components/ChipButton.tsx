'use client'

interface Props {
  children: React.ReactNode
  onClick?: () => void
  empty?: boolean
  disabled?: boolean
  className?: string
}

export const ChipButton = ({
  children,
  onClick,
  empty,
  disabled = false,
  className = ''
}: Props) => {
  const style: React.CSSProperties = empty
    ? { background: 'transparent', borderColor: '#CED1FF', color: '#CED1FF' }
    : { background: '#1820B4', borderColor: '#6168E8', color: '#FFF' }

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (onClick) onClick()
  }

  return (
    <button
      className={`
        ${className} border rounded-full py-1 px-5 font-medium text-lg button 
        flex gap-2 items-center *:size-6 text-nowrap
      `}
      onClick={handleClick}
      {...{ style, disabled }}
    >
      {children}
    </button>
  )
}
