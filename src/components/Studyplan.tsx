import { TodaysLesson } from '@/app/studyplan/TodaysLesson'
import { CONTENT_JSON, FONTS } from '@/consts'
import { useUserStudyplan } from '@/hooks/useUserStudyplan'
import { dataFetch } from '@/lib/utils/dataFetch'
import { getCategoryValues } from '@/lib/utils/getCategoryValues'
import { parseDays } from '@/lib/utils/parseDays'
import { useUserStore } from '@/store/useUserStore'
import type { StudyplanSaved, UserStudyplan } from '@/types.d'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Badge } from './Badge'
import { ChipButton } from './ChipButton'
import { DailyLesson } from './DailyLesson'
import { Header } from './Header'
import { Paragraph } from './Paragraph'
import { BookmarkIcon, ClockIcon, LoadingIcon, MoreIcon, RocketIcon } from './icons'

interface Props {
  studyplan: Omit<StudyplanSaved, 'id' | 'created_by'> & {
    id?: string | null
    created_by?: string | null
  }
  usersCurrent?: boolean
}

export const Studyplan = ({ studyplan, usersCurrent = false }: Props) => {
  const { id = null, name, desc, category, daily_lessons } = studyplan
  const [extendedLesson, setExtendedLesson] = useState(-1)

  const userStudyplan = useUserStore(s => s.studyplan)

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

          <MoreButton usersCurrent={usersCurrent} />
        </div>

        <div className='w-full flex justify-between items-center'>
          <span
            className={`text-gray-10 $${FONTS.INTER} font-medium text-lg flex gap-2 items-center`}
          >
            {getCategoryValues(category).icon}
            {category}
          </span>
          <div className='flex flex-row-reverse gap-4 items-center'>
            {!usersCurrent && <StartStudyplanButton studyplan={studyplan} />}

            <BookmarkIcon className='size-9 text-blue-20 stroke-[1.5px]' />
          </div>
        </div>
      </section>

      {usersCurrent && userStudyplan && (
        <TodaysLesson day={userStudyplan.current_day} daily_lessons={daily_lessons} />
      )}

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
  const setUserStudyplan = useUserStore(s => s.setStudyplan)
  const router = useRouter()

  const handleStartStudyplan = () => {
    setIsLoading(true)

    dataFetch<UserStudyplan | null>({
      url: '/api/user/studyplan',
      options: { method: 'POST', headers: CONTENT_JSON, body: JSON.stringify(studyplan) },

      onSuccess: data => {
        setUserStudyplan(data)
        router.replace('/studyplan')
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

const MoreButton = ({ usersCurrent = false }) => {
  const { abandonStudyplan, navigateToOriginal } = useUserStudyplan({ fetchOnAwake: false })

  const handleClick = () => {
    if (usersCurrent) {
      abandonStudyplan()
      navigateToOriginal()
    }
  }
  return (
    <button className='absolute right-0 top-0 button' onClick={handleClick}>
      <MoreIcon className='text-gray-10 size-7' />
    </button>
  )
}
