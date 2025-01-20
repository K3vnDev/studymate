import { TodaysLesson } from '@/app/studyplan/TodaysLesson'
import { useUserStudyplan } from '@/hooks/useUserStudyplan'
import { StudyplanContext } from '@/lib/context/StudyplanContext'
import { useStudyplansStore } from '@/store/useStudyplansStore'
import { useUserStore } from '@/store/useUserStore'
import type { StudyplanSaved } from '@/types.d'
import { BookmarkIcon } from '@icons'
import { useEffect } from 'react'
import { Badge } from '../Badge'
import { GradientBorder } from '../GradientBorder'
import { Header } from '../Header'
import { Paragraph } from '../Paragraph'
import { Category } from './Category'
import { CompletedBadge } from './CompletedBadge'
import { DailyLessons } from './DailyLessons'
import { FinishButton } from './FinishButton'
import { OptionsButton } from './OptionsButton'
import { StartButton } from './StartButton'

export interface Props {
  studyplan: Omit<StudyplanSaved, 'id' | 'created_by'> & {
    id?: string | null
    created_by?: string | null
  }
  usersCurrent?: boolean
}

export const Studyplan = ({ studyplan, usersCurrent = false }: Props) => {
  const { id, name, desc, category } = studyplan
  const { completed } = useUserStore(s => s.studyplansLists)

  const setStateStudyplan = useStudyplansStore(s => s.setStudyplan)
  useEffect(() => setStateStudyplan(studyplan), [])

  const { userStudyplan, getUtilityValues } = useUserStudyplan()
  const justCompleted = (getUtilityValues()?.allTasksAreCompleted ?? false) && usersCurrent

  const isCompleted = completed?.some(completedId => completedId === id) ?? false
  const userHasAnotherStudyplan = !!userStudyplan && !usersCurrent

  return (
    <StudyplanContext.Provider value={{ studyplan, isCompleted, usersCurrent, userHasAnotherStudyplan }}>
      <section className='flex flex-col gap-9'>
        <div className='flex justify-between items-start'>
          <div className='flex flex-col gap-3 relative'>
            <Badge>STUDYPLAN</Badge>
            <Header s={3}>{name}</Header>
            <Paragraph className='w-4/5'>{desc}</Paragraph>
          </div>

          <OptionsButton />
        </div>

        {/* Buttons section */}
        <div className='w-full flex justify-between items-center'>
          <Category {...{ category }} />

          <div className='flex gap-4 items-center'>
            {!usersCurrent ? (
              <>
                <BookmarkIcon className='size-9 text-blue-20 stroke-[1.5px]' />
                {isCompleted ? <CompletedBadge /> : !userHasAnotherStudyplan && <StartButton />}
              </>
            ) : (
              justCompleted && <FinishButton />
            )}
          </div>
        </div>
      </section>

      {usersCurrent && userStudyplan && <TodaysLesson day={userStudyplan.current_day} />}
      <DailyLessons />
    </StudyplanContext.Provider>
  )
}
