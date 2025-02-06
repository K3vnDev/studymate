import { TodaysLesson } from '@/app/studyplan/TodaysLesson'
import { useUserStudyplan } from '@/hooks/useUserStudyplan'
import { StudyplanContext } from '@/lib/context/StudyplanContext'
import { useStudyplansStore } from '@/store/useStudyplansStore'
import { useUserStore } from '@/store/useUserStore'
import type { StudyplanSaved } from '@types'
import { useEffect } from 'react'
import { Badge } from '../Badge'
import { Header } from '../Header'
import { Paragraph } from '../Paragraph'
import { ButtonsSection } from './ButtonsSection'
import { Category } from './Category'
import { DailyLessons } from './DailyLessons'
import { OptionsButton } from './OptionsButton'

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
            <Paragraph className='xl:w-5/6 w-[95%]'>{desc}</Paragraph>
          </div>

          <OptionsButton />
        </div>

        <div className='w-full gap-x-16 gap-y-4 flex flex-wrap justify-between'>
          <Category category={category} />

          <ButtonsSection {...{ isCompleted, justCompleted, userHasAnotherStudyplan, usersCurrent }} />
        </div>
      </section>

      {usersCurrent && userStudyplan && <TodaysLesson day={userStudyplan.current_day} />}
      <DailyLessons />
    </StudyplanContext.Provider>
  )
}
