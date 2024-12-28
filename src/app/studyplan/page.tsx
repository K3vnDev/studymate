'use client'

import { Loadable } from '@/components/Loadable'
import { Main } from '@/components/Main'
import { Sidebar } from '@/components/Sidebar'
import { Studyplan } from '@/components/Studyplan/Studyplan'
import { useUserStudyplan } from '@/hooks/useUserStudyplan'

export default function UserStudyplanPage() {
  const { userStudyplan, isLoading } = useUserStudyplan()

  return (
    <>
      <Main className='gap-12 px-24 py-12 h-full relative'>
        <Loadable isLoading={isLoading}>
          {userStudyplan ? (
            <Studyplan studyplan={userStudyplan} usersCurrent />
          ) : (
            <span className='text-xl text-white font-semibold'>You have no studyplan</span>
          )}
        </Loadable>
      </Main>

      <Sidebar />
    </>
  )
}
