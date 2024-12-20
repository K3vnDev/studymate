'use client'

import { CardStudyplan } from '@/components/CardStudyplan'
import { ChipButton } from '@/components/ChipButton'
import { FallbackZone } from '@/components/FallbackZone'
import { Main } from '@/components/Main'
import { MateCard } from '@/components/MateCard'
import { Sidebar } from '@/components/Sidebar'
import { ViewStudyplansSection } from '@/components/ViewStudyplansSection'
import { MagicWandIcon, MessageIcon } from '@/components/icons'
import { MATE_MEET_MESSAGE } from '@/consts'
import { useUserPrompts } from '@/hooks/useUserPrompts'
import { dataFetch } from '@/lib/utils/dataFetch'
import { useUserStore } from '@/store/useUserStore'
import type { UserStudyplan } from '@/types.d'
import { useEffect } from 'react'

export default function DashboardPage() {
  const prompts = useUserPrompts({ redirect: true })
  const userStudyplan = useUserStore(s => s.studyplan)
  const setUserStudyplan = useUserStore(s => s.setStudyplan)

  useEffect(() => {
    if (userStudyplan !== undefined) return

    dataFetch<UserStudyplan | null>({
      url: '/api/user/studyplan',
      onSuccess: data => {
        setUserStudyplan(data)
      }
    })
  }, [])

  return (
    <>
      <Main className='gap-12 px-24 py-12 h-full'>
        {userStudyplan === null ? (
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
        ) : userStudyplan !== undefined ? (
          <CardStudyplan className='w-[32rem]' studyplan={userStudyplan} userCurrent />
        ) : (
          <FallbackZone className='w-[32rem] h-40 bg-zinc-600' />
        )}

        <ViewStudyplansSection title='Studyplans for you' storeKey='recomended' maxItems={5} />
      </Main>

      <Sidebar />
    </>
  )
}
