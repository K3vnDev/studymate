import { FONTS } from '@/consts'
import { parseDays } from '@/lib/utils/parseDays'
import type { StudyplanSchema } from '@/types.d'
import { useEffect, useState } from 'react'
import { Badge } from '../../components/Badge'
import { ChipButton } from '../../components/ChipButton'
import { Header } from '../../components/Header'
import { Paragraph } from '../../components/Paragraph'
import {
  CheckIcon,
  ChevronIcon,
  ClockIcon,
  MagicWandIcon,
  MoreIcon,
  RocketIcon
} from '../../components/icons'

export const Studyplan = ({ id, name, desc, category, daily_lessons }: StudyplanSchema) => {
  const [extendedLesson, setExtendedLesson] = useState(-1)

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

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [])

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
          <span className={`text-white $${FONTS.INTER} font-medium text-lg`}>{category}</span>
          <div className='flex gap-4'>
            <ChipButton empty>
              <MagicWandIcon /> Modify
            </ChipButton>
            <ChipButton>
              <RocketIcon /> See today's tasks
            </ChipButton>
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

type DailyLessonProps = StudyplanSchema['daily_lessons'][number] & {
  extendedLesson: number
  setExtendedLesson: React.Dispatch<number>
  i: number
}

const DailyLesson = ({
  name,
  desc,
  tasks,
  extendedLesson,
  setExtendedLesson,
  i
}: DailyLessonProps) => {
  const isExtended = i === extendedLesson

  const handleClick = () => {
    setExtendedLesson(isExtended ? -1 : i)
  }

  const [parentColors, arrowRotation] = isExtended
    ? ['bg-gray-40 border-gray-20', 'rotate-0']
    : ['bg-gray-60 border-gray-40', 'rotate-180']

  return (
    <li
      className={`
        px-7 py-5 ${parentColors} border-2 rounded-lg button cursor-pointer 
        flex flex-col gap-4 transition-all overflow-hidden
      `}
      onClick={handleClick}
    >
      <header className='flex w-full justify-between items-center'>
        <span className={`${FONTS.INTER} text-white font-normal text-base`}>{name}</span>
        <ChevronIcon
          className={`size-6 text-gray-10 ${arrowRotation} [transition:transform_.3s_ease]`}
        />
      </header>
      {extendedLesson === i && (
        <>
          <span className='text-gray-10'>{desc}</span>
          <ul className='flex flex-col gap-1'>
            {tasks.map(({ goal }, i) => (
              <li key={i} className='text-gray-10 text-base flex gap-2 items-center'>
                <CheckIcon className='size-4' />
                {goal}
              </li>
            ))}
          </ul>
        </>
      )}
    </li>
  )
}
