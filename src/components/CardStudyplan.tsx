import { parseDays } from '@/lib/utils/parseDays'
import { useStudyplansStore } from '@/store/useStudyplansStore'
import { useUserStore } from '@/store/useUserStore'
import type { StudyplanUnSaved, UserStudyplan } from '@/types.d'
import { useRouter } from 'next/navigation'
import { Badge } from './Badge'
import { ChipButton } from './ChipButton'
import { GradientBorder } from './GradientBorder'
import { Header } from './Header'
import { Paragraph } from './Paragraph'
import { ClockIcon, RocketIcon } from './icons'

interface Props {
  studyplan: StudyplanUnSaved | UserStudyplan
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
      <li
        className={`
          ${className} w-[22rem] border border-card-border card bg-card-background 
          px-5 py-6 flex flex-col gap-1 rounded-2xl cursor-default
        `}
        onClick={handleClick}
      >
        <Badge>STUDYPLAN</Badge>
        <Header className='mb-1'>{name}</Header>
        <Paragraph>{desc}</Paragraph>
        <div className='mt-3 flex justify-between items-center'>
          <span className='flex text-gray-10 gap-1 items-center'>
            {userCurrent && userStudyplan ? (
              `Day ${userStudyplan.current_day}`
            ) : (
              <>
                <ClockIcon className='size-6' />
                {parseDays(daily_lessons.length)}
              </>
            )}
          </span>
          <ChipButton onClick={handleClick}>
            <RocketIcon />
            See plan
          </ChipButton>
        </div>
      </li>
    </GradientBorder>
  )
}
