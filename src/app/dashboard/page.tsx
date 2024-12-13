'use client'

import { ChipButton } from '@/components/ChipButton'
import { Header1 } from '@/components/Header1'
import { MateCard } from '@/components/MateCard'
import { StudyplanItem } from '@/components/StudyplanItem'
import { MATE_INITIAL_MESSAGE } from '@/consts'
import { STUDYPLANS_MOCK } from '@/mocks'

export default function Dashboard() {
  return (
    <main className='main gap-12 px-24 py-12 h-full'>
      <MateCard message={MATE_INITIAL_MESSAGE}>
        <ChipButton empty>Button</ChipButton>
        <ChipButton>Button</ChipButton>
      </MateCard>

      <section className='flex flex-col gap-4'>
        <Header1>Study Plans for You</Header1>
        <ul className='flex gap-4'>
          {STUDYPLANS_MOCK.map((studyplan, i) => (
            <StudyplanItem key={i} {...studyplan} />
          ))}
        </ul>
      </section>
    </main>
  )
}
