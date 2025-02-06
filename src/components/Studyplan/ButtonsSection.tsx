import { BookmarkIcon } from '@icons'
import { useEffect, useRef } from 'react'
import { CompletedBadge } from './CompletedBadge'
import { FinishButton } from './FinishButton'
import { StartButton } from './StartButton'

interface Props {
  usersCurrent: boolean
  isCompleted: boolean
  userHasAnotherStudyplan: boolean
  justCompleted: boolean
}

export const ButtonsSection = ({
  usersCurrent,
  isCompleted,
  userHasAnotherStudyplan,
  justCompleted
}: Props) => {
  const ref = useRef<HTMLDivElement>(null)

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
          <BookmarkIcon className='size-9 min-w-9 text-blue-20 stroke-[1.5px]' />
          {isCompleted ? <CompletedBadge /> : !userHasAnotherStudyplan && <StartButton />}
        </>
      ) : (
        justCompleted && <FinishButton />
      )}
    </div>
  )
}
