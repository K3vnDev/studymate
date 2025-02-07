'use client'

import { Waitable } from '@components/Waitable'

interface Props {
  children: React.ReactNode
  onClick?: () => void
  empty?: boolean
  disabled?: boolean
  className?: string
  isLoading?: boolean
}

export const ChipButton = ({
  children,
  onClick = () => {},
  empty,
  isLoading = false,
  disabled,
  className = ''
}: Props) => {
  const style = empty
    ? 'bg-transparent border-blue-10 text-blue-10'
    : 'bg-blue-30 border-[#6168E8] text-white'

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    onClick()
  }

  return (
    <button
      className={`
        ${className} ${style} border rounded-full py-1 lg:px-5 px-3 font-medium text-lg button 
        flex lg:gap-2 gap-1 items-center *:size-6 text-nowrap w-fit
      `}
      onClick={handleClick}
      disabled={disabled || isLoading}
    >
      <Waitable isWaiting={isLoading}>{children}</Waitable>
    </button>
  )
}
