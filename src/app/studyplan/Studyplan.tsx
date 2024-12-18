import { FONTS } from '@/consts'
import { getCategoryValues } from '@/lib/utils/getCategoryValues'
import { parseDays } from '@/lib/utils/parseDays'
import type { StudyplanSchema } from '@/types.d'
import { useEffect, useState } from 'react'
import { Badge } from '../../components/Badge'
import { ChipButton } from '../../components/ChipButton'
import { Header } from '../../components/Header'
import { Paragraph } from '../../components/Paragraph'
import { ClockIcon, MagicWandIcon, MoreIcon, RocketIcon } from '../../components/icons'
import { DailyLesson } from './DailyLesson'

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
          <span
            className={`text-gray-10 $${FONTS.INTER} font-medium text-lg flex gap-2 items-center`}
          >
            {getCategoryValues(category).icon}
            {category}
          </span>
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
