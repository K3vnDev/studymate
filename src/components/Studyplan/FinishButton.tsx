import { useUserStudyplan } from '@/hooks/useUserStudyplan'
import { useState } from 'react'
import { GradientBorder } from '../GradientBorder'
import { LoadingIcon, RocketIcon } from '../icons'

export const FinishButton = () => {
  const { finishStudyplan } = useUserStudyplan({ fetchOnAwake: false })
  const [isLoading, setIsLoading] = useState(false)

  const handleClick = async () => {
    setIsLoading(true)
    await finishStudyplan()
    setIsLoading(false)
  }

  return (
    <button className='button rounded-full' onClick={handleClick} disabled={isLoading}>
      <GradientBorder
        color='skySalmon'
        constant
        className={{
          main: 'rounded-full p-1',
          gradient: 'brightness-125',
          gradientWrapper: 'animate-pulse'
        }}
      >
        <div
          className={`
          flex gap-2 border border-transparent py-1 px-5 text-white *:size-6 text-nowrap 
          font-medium text-lg items-center bg-card-background rounded-full
          `}
        >
          {isLoading ? <LoadingIcon className='animate-spin' /> : <RocketIcon />}
          Finish studyplan
        </div>
      </GradientBorder>
    </button>
  )
}
