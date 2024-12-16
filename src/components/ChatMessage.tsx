import { FONTS } from '@/consts'
import { parseDays } from '@/lib/utils/parseDays'
import { repeat } from '@/lib/utils/repeat'
import { useStudyplansStore } from '@/store/useStudyplansStore'
import type { ChatMessage as ChatMessageType, StudyplanSchema } from '@/types.d'
import { useRouter } from 'next/navigation'
import { Badge } from './Badge'
import { ChipButton } from './ChipButton'
import { Header } from './Header'
import { Paragraph } from './Paragraph'
import { ClockIcon, RocketIcon } from './icons'

interface Props {
  role: ChatMessageType['role'] | 'bubbles'
  content: ChatMessageType['content']
}

export const ChatMessage = ({ role, content }: Props) => {
  if (typeof content !== 'string') {
    return <ChatStudyplan {...content} />
  }
  if (role === 'user') {
    return <UserOverlay>{content}</UserOverlay>
  }
  if (role === 'assistant') {
    return <AssistantOverlay>{content}</AssistantOverlay>
  }
  if (role === 'bubbles')
    return (
      <AssistantOverlay>
        <ChatBubbles />
      </AssistantOverlay>
    )

  // TODO: Handle chat error
  return null
}

const ChatStudyplan = (studyplan: StudyplanSchema) => {
  const setStudyplan = useStudyplansStore(s => s.setStudyplan)
  const { name, desc, daily_lessons } = studyplan
  const router = useRouter()

  const handleClick = () => {
    setStudyplan(studyplan)
    router.push('/studyplan')
  }

  return (
    <li className='w-[22rem] border card-bg card-border px-5 py-6 flex flex-col gap-1 rounded-2xl'>
      <Badge>STUDYPLAN</Badge>
      <Header className='mb-1'>{name}</Header>
      <Paragraph>{desc}</Paragraph>
      <div className='mt-3 flex justify-between items-center'>
        <span className='flex text-[#ccc] gap-1 items-center'>
          <ClockIcon className='size-6' />
          {parseDays(daily_lessons.length)}
        </span>
        <ChipButton onClick={handleClick}>
          <RocketIcon />
          See plan
        </ChipButton>
      </div>
    </li>
  )
}

export const ChatBubbles = () => (
  <div className='flex gap-2 items-center justify-center h-7 w-12'>
    {repeat(3, i => (
      <div
        className='size-[0.625rem] bg-[#ccc] rounded-full'
        style={{
          animation: `chat-message-bubbles-pounce 0.4s ease ${i * 0.2}s both infinite alternate`
        }}
        key={i}
      />
    ))}
  </div>
)

interface OverlaysProps {
  children: React.ReactNode
}
const overlaysBase = `px-6 list-none py-3 w-fit max-w-96 rounded-3xl ${FONTS.INTER} font-light`

const UserOverlay = ({ children }: OverlaysProps) => (
  <li className={`${overlaysBase} bg-[#6168E8] text-white rounded-se-none self-end`}>{children}</li>
)
const AssistantOverlay = ({ children }: OverlaysProps) => (
  <li className={`${overlaysBase} bg-[#222] text-[#ccc] rounded-ss-none self-start`}>{children}</li>
)
