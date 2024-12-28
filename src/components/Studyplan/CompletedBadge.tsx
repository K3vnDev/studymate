import { FONTS } from '@/consts'
import { throwConfetti } from '@/lib/utils/throwConfetti'
import { useEffect, useRef, useState } from 'react'
import { GradientBorder } from '../GradientBorder'

export const CompletedBadge = () => {
  const timeout = useRef<NodeJS.Timeout>()
  const [isDisabled, setIsDisabled] = useState(false)

  useEffect(() => () => clearTimeout(timeout.current), [])

  const handleClick = () => {
    throwConfetti()
    setIsDisabled(true)

    timeout.current = setTimeout(() => {
      setIsDisabled(false)
    }, 5000)
  }

  return (
    <button className='card' onClick={handleClick} disabled={isDisabled}>
      <GradientBorder
        color='blues'
        className={{ main: 'py-1 px-4 rounded-lg', gradientWrapper: 'brightness-90' }}
        constant
      >
        <span className={`${FONTS.POPPINS} text-2xl font-semibold text-white`}>COMPLETED</span>
      </GradientBorder>
    </button>
  )
}
