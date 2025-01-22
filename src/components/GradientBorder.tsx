import { EVENTS } from '@consts'
import { useEvent } from '@hooks/useEvent'
import { useEffect, useRef, useState } from 'react'

interface Props {
  className?: {
    main?: string
    contentWrapper?: string
    gradientWrapper?: string
    gradient?: string
  }
  children: React.ReactNode
  color: keyof typeof colors
  constant?: boolean
  bouncy?: boolean
}

const initialAnimationValues = {
  opacity: 'opacity-0 [transition:opacity_2s_ease]',
  animation: 'animate-none'
}

const colors = {
  skySalmon: 'bg-gradient-to-r from-25% from-[#FC5C7D] to-75% to-[#6A82FB]',
  blues: 'bg-gradient-to-r from-blue-30 to-blue-20 animate-spin'
}

export const GradientBorder = ({ children, className, constant = false, bouncy = false, color }: Props) => {
  const [{ opacity, animation }, setAnimationValues] = useState(initialAnimationValues)
  const timeout = useRef<NodeJS.Timeout>()
  const ANIMATION_DURATION = 2000

  useEvent(EVENTS.ON_HIGHLIGHT_BORDER, () => {
    if (!bouncy) return

    setAnimationValues({
      opacity: 'opacity-100 [transition:opacity_0.7s_ease]',
      animation: 'animate-bounce-once'
    })
    clearTimeout(timeout.current)
    timeout.current = setTimeout(() => {
      setAnimationValues(initialAnimationValues)
    }, ANIMATION_DURATION)
  })

  useEffect(() => () => clearTimeout(timeout.current), [])

  return (
    <div className={`${className?.main ?? ''} ${animation} rounded-2xl overflow-clip`}>
      <div className={`${className?.contentWrapper ?? ''} relative`}>
        {children}

        <div
          className={`
            ${className?.gradientWrapper ?? ''} absolute aspect-square w-[calc(200%)] 
            top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-[1]
          `}
        >
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
