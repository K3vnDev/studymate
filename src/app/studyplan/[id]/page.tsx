'use client'

import { Loadable } from '@/components/Loadable'
import { Main } from '@/components/Main'
import { Sidebar } from '@/components/Sidebar'
import { Studyplan } from '@/components/Studyplan/Studyplan'
import { CONTENT_JSON } from '@/consts'
import { useSearchStudyplan } from '@/hooks/useSearchStudyplan'
import { useUserData } from '@/hooks/useUserData'
import { dataFetch } from '@/lib/utils/dataFetch'
import { useStudyplansStore } from '@/store/useStudyplansStore'
import type { StudyplanSaved } from '@/types.d'
import { useParams, useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function PublicStudyplanPage() {
  const studyplan = useStudyplansStore(s => s.studyplan)
  const setStudyplan = useStudyplansStore(s => s.setStudyplan)
  const addStudyplans = useStudyplansStore(s => s.addStudyplans)
  const { searchStudyplan } = useSearchStudyplan()
  useUserData()

  const router = useRouter()
  const { id } = useParams()

  useEffect(() => {
    if (typeof id !== 'string') {
      if (studyplan === null) router.push('./dashboard')
      return
    }

    if (studyplan === null || (studyplan as StudyplanSaved)?.id !== id) {
      const foundStudyplan = searchStudyplan(id)

      if (foundStudyplan) {
        setStudyplan(foundStudyplan)
        return
      }
    } else if ((studyplan as StudyplanSaved)?.id === id) {
      return
    }

    setStudyplan(null)

    dataFetch<StudyplanSaved[]>({
      url: '/api/studyplans',
      options: { method: 'POST', headers: CONTENT_JSON, body: JSON.stringify([id]) },
      onSuccess: ([data]) => {
        setStudyplan(data)
        addStudyplans(data)
      }
    })
  }, [])

  return (
    <>
      <Main className='gap-12 px-24 py-12 h-full relative'>
        <Loadable isLoading={!studyplan}>{studyplan && <Studyplan {...{ studyplan }} />}</Loadable>
      </Main>

      <Sidebar />
    </>
  )
}
