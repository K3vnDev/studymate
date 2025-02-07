import { useUserPrompts } from '@/hooks/useUserPrompts'
import { CardMate } from '@components/CardMate'
import { ChipButton } from '@components/ChipButton'
import { MATE_MESSAGES } from '@consts'
import { MagicWandIcon } from '@icons'
import type { ChatMessage } from '@types'
import { Header } from './Header'
import { MessagesList } from './MessagesList'

interface Props {
  messages: ChatMessage[] | null
}

export const Content = ({ messages }: Props) => {
  const prompt = useUserPrompts()

  if (messages?.length) {
    return (
      <>
        <Header />
        <MessagesList />
      </>
    )
  }

  return (
    <div className='absolute top-1/2 -translate-y-[calc(100%+.75rem)]'>
      <CardMate message={MATE_MESSAGES.MEET}>
        <ChipButton onClick={prompt.createStudyplan} empty>
          <MagicWandIcon />
          Create a studyplan
        </ChipButton>
      </CardMate>
    </div>
  )
}
