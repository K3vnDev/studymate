import { parseDays } from '@/lib/utils/parseDays'
import { useStudyplansStore } from '@/store/useStudyplansStore'
import { useUserStore } from '@/store/useUserStore'
import { Badge } from '@components/Badge'
import { ChipButton } from '@components/ChipButton'
import { GradientBorder } from '@components/GradientBorder'
import { Header } from '@components/Header'
import { Paragraph } from '@components/Paragraph'
import { ClockIcon, RocketIcon } from '@icons'
import type { ChatStudyplan, StudyplanUnSaved, UserStudyplan } from '@types'
import { useRouter } from 'next/navigation'

interface Props {
  studyplan: StudyplanUnSaved | UserStudyplan | ChatStudyplan
  userCurrent?: boolean
  className?: string
}

export const CardStudyplan = ({ studyplan, userCurrent = false, className = '' }: Props) => {
  const setStudyplan = useStudyplansStore(s => s.setStudyplan)
  const userStudyplan = useUserStore(s => s.studyplan)

  const { name, desc, daily_lessons } = studyplan
  const router = useRouter()

  const handleClick = () => {
    setStudyplan(studyplan)
    router.push(userCurrent ? '/studyplan' : '/chat/studyplan')
  }

  const borderWidth = userCurrent ? 'p-0.5' : 'p-px'

  return (
    <GradientBorder
      className={{
        main: `w-fit ${borderWidth}`
      }}
      color='blues'
      constant={userCurrent}
    >
      <article
        className={`
          ${className} w-[22rem] border border-card-border card bg-card-background 
          px-5 py-6 flex flex-col gap-1 rounded-2xl cursor-default
        `}
        onClick={handleClick}
      >
        <Badge>STUDYPLAN</Badge>
        <Header className='mb-1'>{name}</Header>
        <Paragraph>{desc}</Paragraph>
        <div className='mt-3 flex justify-between items-center flex-wrap gap-x-4 gap-y-3 w-full'>
          <span className='flex text-gray-10 gap-1 items-center text-nowrap'>
            {userCurrent && userStudyplan ? (
              `Day ${userStudyplan.current_day}`
            ) : (
              <>
                <ClockIcon className='size-6' />
                {parseDays(daily_lessons.length)}
              </>
            )}
          </span>
          <ChipButton onClick={handleClick} className='justify-self-end'>
            <RocketIcon />
            See plan
          </ChipButton>
        </div>
      </article>
    </GradientBorder>
  )
}
