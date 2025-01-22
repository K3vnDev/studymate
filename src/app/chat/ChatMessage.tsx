import { CardStudyplan } from '@/components/CardStudyplan'
import { dispatchEvent } from '@/lib/utils/dispatchEvent'
import { repeat } from '@/lib/utils/repeat'
import { useUserStore } from '@/store/useUserStore'
import { EVENTS, FONTS } from '@consts'
import { ErrorIcon, ReloadIcon } from '@icons'
import type { ChatMessage as ChatMessageType, StudyplanUnSaved } from '@types'
import { isEqual } from 'lodash'

interface Props {
  role: ChatMessageType['role'] | 'bubbles'
  content: ChatMessageType['content']
}

export const ChatMessage = ({ role, content }: Props) => {
  const userStudyplan = useUserStore(s => s.studyplan)

  if (typeof content !== 'string') {
    const studyplan: StudyplanUnSaved = content
    let userCurrent = false

    if (userStudyplan) {
      const { original_id, current_day, ...parsedUserStudyplan } = userStudyplan
      userCurrent = isEqual(parsedUserStudyplan, studyplan)
    }
    return <CardStudyplan {...{ studyplan, userCurrent }} />
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
    dispatchEvent(EVENTS.ON_CHAT_TRY_AGAIN)
  }

  return (
    <li
      className={`
        ${FONTS.INTER} error rounded-md py-5 px-7 group
         w-fit flex gap-4 items-center justify-center relative button cursor-pointer
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
  <li className={`${overlaysBase} bg-gray-40 text-gray-10 rounded-ss-none self-start`}>{children}</li>
)
