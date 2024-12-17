'use client'

import { ChipButton } from '@/components/ChipButton'
import { MateCard } from '@/components/MateCard'
import { RecomendedStudyplansSection } from '@/components/RecomendedStudyplansSection'
import { MagicWandIcon, MessageIcon } from '@/components/icons'
import { MATE_MEET_MESSAGE } from '@/consts'
import { useUserPrompts } from '@/hooks/useUserPrompts'

export default function DashboardPage() {
  const prompts = useUserPrompts({ redirect: true })

  return (
    <main className='main gap-12 px-24 py-12 h-full'>
      <MateCard message={MATE_MEET_MESSAGE} onClick={prompts.blank}>
        <ChipButton empty onClick={prompts.createStudyplan}>
          <MagicWandIcon />
          Create a studyplan
        </ChipButton>
        <ChipButton onClick={prompts.blank}>
          <MessageIcon />
          Chat
        </ChipButton>
      </MateCard>

      <RecomendedStudyplansSection />
    </main>
  )
}
