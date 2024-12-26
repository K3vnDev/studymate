import { EVENTS } from '@/consts'
import { useEvent } from '@/hooks/useEvent'
import { useEffect, useRef, useState } from 'react'

interface Props {
  className?: {
    gradient?: string
    main?: string
  }
  children: React.ReactNode
  color: keyof typeof colors
  constant?: boolean
}

const initialAnimationValues = {
  opacity: 'opacity-0 [transition:opacity_2s_ease]',
  animation: 'animate-none'
}

const colors = {
  skySalmon: 'bg-gradient-to-r from-25% from-[#FC5C7D] to-75% to-[#6A82FB]',
  blues: 'bg-gradient-to-r from-blue-30 to-blue-20 animate-spin'
}

export const GradientBorder = ({ children, className, constant = false, color }: Props) => {
  const [{ opacity, animation }, setAnimationValues] = useState(initialAnimationValues)
  const timeout = useRef<NodeJS.Timeout>()
  const ANIMATION_DURATION = 2000

  useEvent(EVENTS.ON_HIGHLIGHT_BORDER, () => {
    setAnimationValues({
      opacity: 'opacity-100 [transition:opacity_0.7s_ease]',
      animation: 'animate-bounce-once'
    })
    timeout.current = setTimeout(() => {
      setAnimationValues(initialAnimationValues)
    }, ANIMATION_DURATION)
  })

  useEffect(() => () => clearTimeout(timeout.current), [])

  return (
    <div className={`${className?.main ?? ''} ${animation} rounded-2xl overflow-clip`}>
      <div className='relative'>
        {children}

        <div className='absolute aspect-square w-[calc(200%)] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-[1]'>
          <div
            className={`
              ${className?.gradient ?? ''} ${colors[color]} w-full h-full 
              ${constant ? 'opacity-100' : opacity} animate-spin
            `}
          />
        </div>
      </div>
    </div>
  )
}
