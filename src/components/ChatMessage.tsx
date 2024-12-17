import { EVENTS, FONTS } from '@/consts'
import { parseDays } from '@/lib/utils/parseDays'
import { repeat } from '@/lib/utils/repeat'
import { useStudyplansStore } from '@/store/useStudyplansStore'
import type { ChatMessage as ChatMessageType, StudyplanSchema } from '@/types.d'
import { useRouter } from 'next/navigation'
import { Badge } from './Badge'
import { ChipButton } from './ChipButton'
import { Header } from './Header'
import { Paragraph } from './Paragraph'
import { ClockIcon, ErrorIcon, ReloadIcon, RocketIcon } from './icons'

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

  return <ChatError>{content}</ChatError>
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
    <li className='w-[22rem] border border-card-border bg-card-background px-5 py-6 flex flex-col gap-1 rounded-2xl'>
      <Badge>STUDYPLAN</Badge>
      <Header className='mb-1'>{name}</Header>
      <Paragraph>{desc}</Paragraph>
      <div className='mt-3 flex justify-between items-center'>
        <span className='flex text-gray-10 gap-1 items-center'>
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
        className='size-[0.625rem] bg-gray-10 rounded-full'
        style={{
          animation: `chat-message-bubbles-pounce 0.4s ease ${i * 0.2}s both infinite alternate`
        }}
        key={i}
      />
    ))}
  </div>
)

interface ChildrenProps {
  children: React.ReactNode
}

export const ChatError = ({ children }: ChildrenProps) => {
  const handleClick = () => {
    document.dispatchEvent(new Event(EVENTS.ON_CHAT_TRY_AGAIN, {}))
  }

  return (
    <li
      className={`
        ${FONTS.INTER} bg-red-700/15 border border-red-500/45 rounded-md py-5 px-7 group
         w-fit flex gap-4 text-red-500 items-center justify-center relative button cursor-pointer
      `}
      onClick={handleClick}
    >
      <ErrorIcon className='size-8' />
      <div className='flex flex-col'>
        <span className='font-medium'>{children}</span>
        <span className='text-sm opacity-75'>Click to try again</span>
      </div>

      <ReloadIcon className='absolute size-8 -right-12 group-hover:rotate-180 group-hover:scale-110 [transition:transform_.33s_ease-out]' />
    </li>
  )
}

const overlaysBase = `px-6 list-none py-3 w-fit max-w-96 rounded-3xl ${FONTS.INTER} font-light`

const UserOverlay = ({ children }: ChildrenProps) => (
  <li className={`${overlaysBase} bg-blue-20 text-white rounded-se-none self-end`}>{children}</li>
)
const AssistantOverlay = ({ children }: ChildrenProps) => (
  <li className={`${overlaysBase} bg-gray-40 text-gray-10 rounded-ss-none self-start`}>
    {children}
  </li>
)
