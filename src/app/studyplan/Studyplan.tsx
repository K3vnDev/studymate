import { CONTENT_JSON, FONTS } from '@/consts'
import { dataFetch } from '@/lib/utils/dataFetch'
import { getCategoryValues } from '@/lib/utils/getCategoryValues'
import { parseDays } from '@/lib/utils/parseDays'
import { useStudyplansStore } from '@/store/useStudyplansStore'
import type { StudyplanSaved, UserStudyplan } from '@/types.d'
import { useEffect, useState } from 'react'
import { Badge } from '../../components/Badge'
import { ChipButton } from '../../components/ChipButton'
import { Header } from '../../components/Header'
import { Paragraph } from '../../components/Paragraph'
import { BookmarkIcon, ClockIcon, LoadingIcon, MoreIcon, RocketIcon } from '../../components/icons'
import { DailyLesson } from './DailyLesson'

interface Props {
  studyplan: Omit<StudyplanSaved, 'id' | 'created_by'> & {
    id?: string | null
    created_by?: string | null
  }
}

export const Studyplan = ({ studyplan }: Props) => {
  const { id = null, name, desc, category, daily_lessons } = studyplan
  const [extendedLesson, setExtendedLesson] = useState(-1)

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [])

  // Change selected daily lesson on arrow keys pressed
  const handleKeyDown = ({ key }: KeyboardEvent) => {
    if (key === 'ArrowUp') {
      setExtendedLesson(ex => {
        return ex <= 0 ? daily_lessons.length - 1 : ex - 1
      })
    } else if (key === 'ArrowDown') {
      setExtendedLesson(ex => {
        return ex >= daily_lessons.length - 1 ? 0 : ex + 1
      })
    }
  }

  return (
    <>
      <section className='flex flex-col gap-9'>
        <div className='flex flex-col gap-3 relative'>
          <Badge>STUDYPLAN</Badge>
          <Header s={3}>{name}</Header>
          <Paragraph className='w-4/5'>{desc}</Paragraph>

          <button className='absolute right-0 top-0 button'>
            <MoreIcon className='text-gray-10 size-7' />
          </button>
        </div>

        <div className='w-full flex justify-between items-center'>
          <span
            className={`text-gray-10 $${FONTS.INTER} font-medium text-lg flex gap-2 items-center`}
          >
            {getCategoryValues(category).icon}
            {category}
          </span>
          <div className='flex flex-row-reverse gap-4 items-center'>
            <StartStudyplanButton studyplan={studyplan} />
            <BookmarkIcon className='size-9 text-blue-20 stroke-[1.5px]' />
          </div>
        </div>
      </section>

      <section className='flex flex-col gap-5'>
        <div className='flex justify-between items-center'>
          <Header>Daily Lessons</Header>
          <span className='flex gap-2 text-gray-10 text-lg items-center'>
            <ClockIcon className='size-6' />
            {parseDays(daily_lessons.length)}
          </span>
        </div>
        <ul className='flex flex-col gap-3'>
          {daily_lessons.map((dailyLesson, i) => (
            <DailyLesson key={i} {...{ i, extendedLesson, setExtendedLesson, ...dailyLesson }} />
          ))}
        </ul>
      </section>
    </>
  )
}

const StartStudyplanButton = ({ studyplan }: Props) => {
  const [isLoading, setIsLoading] = useState(false)
  const setUserStudyplan = useStudyplansStore(s => s.setUserStudyplan)

  const handleStartStudyplan = () => {
    setIsLoading(true)

    dataFetch<UserStudyplan>({
      url: '/api/studyplan',
      options: { method: 'POST', headers: CONTENT_JSON, body: JSON.stringify(studyplan) },

      onSuccess: data => {
        setIsLoading(false)
        setUserStudyplan(data)
      }
    })
  }

  return (
    <ChipButton onClick={handleStartStudyplan} disabled={isLoading}>
      {isLoading ? <LoadingIcon className='animate-spin' /> : <RocketIcon />}
      Start this studyplan
    </ChipButton>
  )
}
