'use client'

import { LoadingIcon } from '@icons'
import { useEffect, useRef, useState } from 'react'

interface Props {
  children: React.ReactNode
  onClick?: () => void
  empty?: boolean
  disabled?: boolean
  className?: string
  isLoading?: boolean
}

export const ChipButton = ({ children, onClick, empty, isLoading, disabled, className = '' }: Props) => {
  const style = empty
    ? 'bg-transparent border-blue-10 text-blue-10'
    : 'bg-blue-30 border-[#6168E8] text-white'

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (onClick) onClick()
  }

  const initialChildren = useRef(children)
  const [parsedChilren, setParsedChilren] = useState(children)

  useEffect(() => {
    setParsedChilren(() =>
      isLoading && Array.isArray(children) && children.length === 2
        ? [<LoadingIcon className='animate-spin' key={0} />, children[1]]
        : initialChildren.current
    )
  }, [isLoading])

  return (
    <button
      className={`
        ${className} ${style} border rounded-full py-1 px-5 font-medium text-lg button 
        flex gap-2 items-center *:size-6 text-nowrap w-fit
      `}
      onClick={handleClick}
      disabled={disabled || isLoading}
    >
      {parsedChilren}
    </button>
  )
}
