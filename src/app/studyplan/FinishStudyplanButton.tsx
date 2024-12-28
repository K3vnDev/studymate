import { useUserStudyplan } from '@/hooks/useUserStudyplan'
import { dataFetch } from '@/lib/utils/dataFetch'
import { throwConfetti } from '@/lib/utils/throwConfetti'
import { useUserStore } from '@/store/useUserStore'
import { useEffect, useRef, useState } from 'react'
import { GradientBorder } from '../../components/GradientBorder'
import { LoadingIcon, RocketIcon } from '../../components/icons'

export const FinishStudyplanButton = () => {
  const setUserStudyplan = useUserStore(s => s.setStudyplan)
  const setStudyplansLists = useUserStore(s => s.setStudyplansLists)

  const { navigateToOriginal } = useUserStudyplan({ fetchOnAwake: false })
  const [isLoading, setIsLoading] = useState(false)

  const handleClick = () => {
    setIsLoading(true)

    dataFetch<string>({
      url: '/api/user/studyplan',
      options: { method: 'PUT' },
      onSuccess: originalId => {
        if (!userHasLeft.current) {
          navigateToOriginal('replace')

          setTimeout(() => {
            setUserStudyplan(null)
            throwConfetti()
          }, 650)
        } else {
          setUserStudyplan(null)
        }

        setStudyplansLists(studyplansLists => {
          const { completed } = studyplansLists
          if (!completed) return studyplansLists

          if (!completed.some(id => id === originalId)) {
            completed.push(originalId)
          }
          return { ...studyplansLists, completed }
        })
      },
      onFinish: () => setIsLoading(false)
    })
  }

  // biome-ignore format: <>
  useEffect(() => {
    userHasLeft.current = false
    return () => { userHasLeft.current = true }
  }, [])
  const userHasLeft = useRef(false)

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
