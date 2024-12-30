import { TodaysLesson } from '@/app/studyplan/TodaysLesson'
import { useUserStudyplan } from '@/hooks/useUserStudyplan'
import { useUserStore } from '@/store/useUserStore'
import type { StudyplanSaved } from '@/types.d'
import { Badge } from '../Badge'
import { Header } from '../Header'
import { Paragraph } from '../Paragraph'
import { BookmarkIcon } from '../icons'
import { Category } from './Category'
import { CompletedBadge } from './CompletedBadge'
import { DailyLessons } from './DailyLessons'
import { FinishButton } from './FinishButton'
import { OptionsButton } from './OptionsButtons'
import { StartButton } from './StartButton'

export interface Props {
  studyplan: Omit<StudyplanSaved, 'id' | 'created_by'> & {
    id?: string | null
    created_by?: string | null
  }
  usersCurrent?: boolean
}

export const Studyplan = ({ studyplan, usersCurrent = false }: Props) => {
  const { id, name, desc, category, daily_lessons } = studyplan
  const { completed } = useUserStore(s => s.studyplansLists)

  const { userStudyplan, getUtilityValues } = useUserStudyplan()
  const justCompleted = (getUtilityValues()?.allTasksAreCompleted ?? false) && usersCurrent

  const isCompleted = completed?.some(completedId => completedId === id) ?? false

  return (
    <>
      <section className='flex flex-col gap-9'>
        <div className='flex justify-between items-start'>
          <div className='flex flex-col gap-3 relative'>
            <Badge>STUDYPLAN</Badge>
            <Header s={3}>{name}</Header>
            <Paragraph className='w-4/5'>{desc}</Paragraph>
          </div>
          <OptionsButton usersCurrent={usersCurrent} />
        </div>

        {/* Buttons section */}
        <div className='w-full flex justify-between items-center'>
          <Category {...{ category }} />

          <div className='flex gap-4 items-center'>
            {!usersCurrent ? (
              <>
                <BookmarkIcon className='size-9 text-blue-20 stroke-[1.5px]' />
                {isCompleted ? <CompletedBadge /> : <StartButton />}
              </>
            ) : (
              justCompleted && <FinishButton />
            )}
          </div>
        </div>
      </section>

      {/* Today's lesson */}
      {usersCurrent && userStudyplan && (
        <TodaysLesson {...{ daily_lessons, day: userStudyplan.current_day }} />
      )}

      {/* Daily lessons */}
      <DailyLessons {...{ daily_lessons }} />
    </>
  )
}
