'use client'

import { ChipButton } from '@/components/ChipButton'
import { MateCard } from '@/components/MateCard'
import { RecomendedStudyplansSection } from '@/components/RecomendedStudyplansSection'
import { MagicWandIcon, MessageIcon } from '@/components/icons'
import { MATE_MEET_MESSAGE } from '@/consts'
import { useRouter } from 'next/navigation'

export default function DashboardPage() {
  const router = useRouter()

  const navigateToChat = () => {
    router.push('/chat')
  }

  return (
    <main className='main gap-12 px-24 py-12 h-full'>
      <MateCard message={MATE_MEET_MESSAGE}>
        <ChipButton empty>
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
