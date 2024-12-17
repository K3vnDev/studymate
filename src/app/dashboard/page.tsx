'use client'

import { ChipButton } from '@/components/ChipButton'
import { MateCard } from '@/components/MateCard'
import { RecomendedStudyplansSection } from '@/components/RecomendedStudyplansSection'
import { MagicWandIcon, MessageIcon } from '@/components/icons'
import { MATE_MEET_MESSAGE, USER_PROMPTS } from '@/consts'
import { useChatsStore } from '@/store/useChatsStore'
import { useRouter } from 'next/navigation'

export default function DashboardPage() {
  const setHighlihtedMessage = useChatsStore(s => s.setHighlihtedMessage)
  const router = useRouter()

  const navigateToChat = () => {
    router.push('/chat')
  }

  const promptMateForAStudyplan = () => {
    setHighlihtedMessage(USER_PROMPTS.GENERATE_STUDYPLAN)
    navigateToChat()
  }

  return (
    <main className='main gap-12 px-24 py-12 h-full'>
      <MateCard message={MATE_MEET_MESSAGE}>
        <ChipButton empty onClick={promptMateForAStudyplan}>
          <MagicWandIcon />
          Create a studyplan
        </ChipButton>
        <ChipButton onClick={navigateToChat}>
          <MessageIcon />
          Chat
        </ChipButton>
      </MateCard>

      <RecomendedStudyplansSection />
    </main>
  )
}
