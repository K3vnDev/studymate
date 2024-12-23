'use client'

import { Loading } from '@/components/Loading'
import { Main } from '@/components/Main'
import { Sidebar } from '@/components/Sidebar'
import { Studyplan } from '@/components/Studyplan'
import { useUserStudyplan } from '@/hooks/useUserStudyplan'

export default function UserStudyplanPage() {
  const { userStudyplan } = useUserStudyplan({ redirectTo: '/dashboard' })

  return (
    <>
      <Main className='gap-12 px-24 py-12 h-full relative'>
        {userStudyplan ? <Studyplan studyplan={userStudyplan} usersCurrent /> : <Loading />}
      </Main>

      <Sidebar />
    </>
  )
}
