'use client'

import { Button, ErrorCard, Gigant, Message } from '@/components/ErrorCard'
import { Loadable } from '@/components/Loadable'
import { Main } from '@/components/Main'
import { Sidebar } from '@/components/Sidebar'
import { Studyplan } from '@/components/Studyplan/Studyplan'
import { MagicWandIcon } from '@/components/icons'
import { useUserPrompts } from '@/hooks/useUserPrompts'
import { useUserStudyplan } from '@/hooks/useUserStudyplan'

export default function UserStudyplanPage() {
  const { userStudyplan, isLoading } = useUserStudyplan()
  const prompts = useUserPrompts({ redirect: true })

  return (
    <>
      <Main className='gap-12 h-full relative'>
        <Loadable isLoading={isLoading}>
          {userStudyplan ? (
            <Studyplan studyplan={userStudyplan} usersCurrent />
          ) : (
            <ErrorCard className='left-1/2 -translate-x-1/2'>
              <Gigant>Whoops...</Gigant>
              <Message>You currently don't have a studyplan</Message>
              <Button onClick={prompts.createStudyplan}>
                <MagicWandIcon />
                Create studyplan
              </Button>
            </ErrorCard>
          )}
        </Loadable>
      </Main>

      <Sidebar />
    </>
  )
}
