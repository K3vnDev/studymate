import { FONTS } from '@/consts'
import { parseDays } from '@/lib/utils/parseDays'
import type { StudyplanSchema } from '@/types.d'
import { Badge } from '../../components/Badge'
import { ChipButton } from '../../components/ChipButton'
import { Header } from '../../components/Header'
import { Paragraph } from '../../components/Paragraph'
import { ChevronIcon, ClockIcon, MagicWandIcon, MoreIcon, RocketIcon } from '../../components/icons'

export const Studyplan = ({ id, name, desc, category, daily_lessons }: StudyplanSchema) => (
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
          <DailyLesson key={i} {...dailyLesson} />
        ))}
      </ul>
    </section>
  </>
)

const DailyLesson = ({ name, desc, tasks }: StudyplanSchema['daily_lessons'][number]) => (
  <li className='px-7 py-5 bg-gray-60 border-2 border-gray-40 rounded-lg button cursor-pointer'>
    <header className='flex w-full justify-between items-center'>
      <span className={`${FONTS.INTER} text-white font-normal text-base`}>{name}</span>
      <ChevronIcon className='size-6 text-gray-10 rotate-180' />
    </header>
  </li>
)
