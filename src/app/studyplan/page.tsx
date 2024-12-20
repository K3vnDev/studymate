'use client'

import { Loading } from '@/components/Loading'
import { Main } from '@/components/Main'
import { Sidebar } from '@/components/Sidebar'
import { Studyplan } from '@/components/Studyplan'
import { dataFetch } from '@/lib/utils/dataFetch'
import { useUserStore } from '@/store/useUserStore'
import type { UserStudyplan } from '@/types.d'
import { useEffect } from 'react'

export default function UserStudyplanPage() {
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
      <Main className='gap-12 px-24 py-12 h-full relative'>
        {userStudyplan ? <Studyplan studyplan={userStudyplan} usersCurrent /> : <Loading />}
      </Main>

      <Sidebar />
    </>
  )
}
