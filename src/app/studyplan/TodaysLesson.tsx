import { Badge } from '@/components/Badge'
import { ChipButton } from '@/components/ChipButton'
import { Paragraph } from '@/components/Paragraph'
import { CheckIcon, RocketIcon } from '@/components/icons'
import type { UserStudyplan } from '@/types.d'
import { useRouter } from 'next/navigation'

interface Props {
  daily_lessons: UserStudyplan['daily_lessons']
  day: number
}

export const TodaysLesson = ({ daily_lessons, day }: Props) => {
  const { name, desc, tasks } = daily_lessons[day - 1]
  const router = useRouter()

  const allTasksAreDone = tasks.every(task => task.done)

  const handleClick = () => {
    router.push('/studyplan/tasks')
  }

  return (
    <section
      className='flex w-full h-fit flex-col bg-card-background px-7 py-6 rounded-2xl border border-card-border card'
      onClick={handleClick}
    >
      <div className='flex w-full justify-between items-center'>
        <Badge className='mb-3'>TODAY'S LESSON</Badge>
        {allTasksAreDone && <CheckIcon className='text-blue-20 size-7 scale-150 origin-right' />}
      </div>

      <div className='flex flex-col gap-1'>
        <Paragraph s={3} className='font-medium text-white'>
          {name}:
        </Paragraph>
        <Paragraph>{desc}</Paragraph>
      </div>

      <div className='flex justify-between items-center mt-6'>
        <span className='text-white'>Day {day}</span>
        <ChipButton onClick={handleClick}>
          <RocketIcon />
          See today's tasks
        </ChipButton>
      </div>
    </section>
  )
}
