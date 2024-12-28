'use client'

import { CardMate } from '@/components/CardMate'
import { CardStudyplan } from '@/components/CardStudyplan'
import { ChipButton } from '@/components/ChipButton'
import { FallbackZone } from '@/components/FallbackZone'
import { Main } from '@/components/Main'
import { PreviewStudyplansSection } from '@/components/PreviewStudyplansSection'
import { Sidebar } from '@/components/Sidebar'
import { MagicWandIcon, MessageIcon } from '@/components/icons'
import { MATE_MESSAGES } from '@/consts'
import { useUserData } from '@/hooks/useUserData'
import { useUserPrompts } from '@/hooks/useUserPrompts'
import { useUserStudyplan } from '@/hooks/useUserStudyplan'

export default function DashboardPage() {
  const prompts = useUserPrompts({ redirect: true })
  const { userStudyplan, isLoading } = useUserStudyplan()
  useUserData()

  return (
    <>
      <Main className='gap-12 px-24 py-12 h-full'>
        {!userStudyplan && !isLoading ? (
          <CardMate message={MATE_MESSAGES.MEET}>
            <ChipButton empty onClick={prompts.createStudyplan}>
              <MagicWandIcon />
              Create a studyplan
            </ChipButton>
            <ChipButton onClick={prompts.blank}>
              <MessageIcon />
              Chat
            </ChipButton>
          </CardMate>
        ) : userStudyplan ? (
          <CardStudyplan className='w-[32rem]' studyplan={userStudyplan} userCurrent />
        ) : (
          <FallbackZone className='w-[32rem] h-40 bg-zinc-600' />
        )}

        <PreviewStudyplansSection title='Studyplans for you' storeKey='recomended' maxItems={5} />
      </Main>

      <Sidebar />
    </>
  )
}
