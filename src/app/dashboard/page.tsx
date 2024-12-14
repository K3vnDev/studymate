'use client'

import { ChipButton } from '@/components/ChipButton'
import { MateCard } from '@/components/MateCard'
import { RecomendedStudyplansSection } from '@/components/RecomendedStudyplansSection'
import { MATE_INITIAL_MESSAGE } from '@/consts'

export default function DashboardPage() {
  return (
    <main className='main gap-12 px-24 py-12 h-full'>
      <MateCard message={MATE_INITIAL_MESSAGE}>
        <ChipButton empty>Button</ChipButton>
        <ChipButton>Button</ChipButton>
      </MateCard>

      <RecomendedStudyplansSection />
    </main>
  )
}
