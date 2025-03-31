import { BookmarkIcon } from '@icons'
import { useContext, useEffect, useRef } from 'react'
import { CompletedBadge } from './CompletedBadge'
import { FinishButton } from './FinishButton'
import { StartButton } from './StartButton'
import { StudyplanContext } from '@/lib/context/StudyplanContext'
import { SaveButton } from './SaveButton'

export const ButtonsSection = () => {
  const ref = useRef<HTMLDivElement>(null)
  const { usersCurrent, isCompleted, justCompleted, userHasAnotherStudyplan } = useContext(StudyplanContext)

  useEffect(() => {
    if (typeof window === 'undefined') return

    const handleResize = () => {
      const thisElement = ref.current
      if (!thisElement?.previousElementSibling) return

      const elementSibling = thisElement.previousElementSibling as HTMLDivElement
      const { style } = thisElement

      style.width = 'fit-content'
      style.justifyContent = 'flex-end'

      if (thisElement.offsetTop !== elementSibling.offsetTop) {
        style.width = '100%'
        style.justifyContent = 'space-between'
      }
    }
    handleResize()

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [ref.current])

  return (
    <div className='flex justify-end gap-4' ref={ref}>
      {!usersCurrent ? (
        <>
          <SaveButton />
          {isCompleted ? <CompletedBadge /> : !userHasAnotherStudyplan && <StartButton />}
        </>
      ) : (
        justCompleted && <FinishButton />
      )}
    </div>
  )
}
