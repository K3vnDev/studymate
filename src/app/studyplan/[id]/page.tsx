'use client'

import { Loading } from '@/components/Loading'
import { Main } from '@/components/Main'
import { Sidebar } from '@/components/Sidebar'
import { Studyplan } from '@/components/Studyplan'
import { useSearchStudyplan } from '@/hooks/useSearchStudyplan'
import { dataFetch } from '@/lib/utils/dataFetch'
import { useStudyplansStore } from '@/store/useStudyplansStore'
import type { StudyplanSaved } from '@/types.d'
import { useParams, useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function PublicStudyplanPage() {
  const studyplan = useStudyplansStore(s => s.studyplan)
  const setStudyplan = useStudyplansStore(s => s.setStudyplan)
  const router = useRouter()
  const { searchStudyplan } = useSearchStudyplan()

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

    dataFetch<StudyplanSaved>({
      url: `/api/studyplans?id=${id}`,
      onSuccess: data => {
        setStudyplan(data)
      },
      onError: () => {
        // TODO: show error to user
      }
    })
  }, [])

  return (
    <>
      <Main className='gap-12 px-24 py-12 h-full relative'>
        {studyplan !== null ? <Studyplan {...{ studyplan }} /> : <Loading />}
      </Main>

      <Sidebar />
    </>
  )
}
