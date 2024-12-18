import type { UserStudyplan } from '@/types.d'
import { Badge } from './Badge'
import { ChipButton } from './ChipButton'
import { GradientBorder } from './GradientBorder'
import { Paragraph } from './Paragraph'
import { RocketIcon } from './icons'

interface Props {
  daily_lessons: UserStudyplan['daily_lessons']
  day: number
}

export const TodaysLesson = ({ daily_lessons, day }: Props) => {
  const { name, desc } = daily_lessons[day]

  return (
    <GradientBorder
      className={{
        gradient: 'bg-gradient-to-r from-blue-30 to-blue-20 animate-spin',
        main: 'w-full'
      }}
    >
      <section className='flex w-full h-fit flex-col bg-card-background px-7 py-6 rounded-2xl'>
        <Badge className='mb-3'>TODAY'S LESSON</Badge>

        <div className='flex flex-col gap-1'>
          <Paragraph s={3} className='font-medium text-white'>
            {name}:
          </Paragraph>
          <Paragraph>{desc}</Paragraph>
        </div>

        <div className='flex justify-between items-center mt-6'>
          <span className='text-white'>Day {day + 1}</span>
          <ChipButton>
            <RocketIcon />
            See today's tasks
          </ChipButton>
        </div>
      </section>
    </GradientBorder>
  )
}
