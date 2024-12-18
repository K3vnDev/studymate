'use client'

import { Studyplan } from '@/app/studyplan/Studyplan'
import { Loading } from '@/components/Loading'
import { Main } from '@/components/Main'
import { Sidebar } from '@/components/Sidebar'
import { LoadingIcon } from '@/components/icons'
import { useSearchStudyplan } from '@/hooks/useSearchStudyplan'
import { dataFetch } from '@/lib/utils/dataFetch'
import { useStudyplansStore } from '@/store/useStudyplansStore'
import type { StudyplanSaved } from '@/types'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function StudyplanPage() {
  const studyplan = useStudyplansStore(s => s.studyplan)
  const setStudyplan = useStudyplansStore(s => s.setStudyplan)
  const { searchStudyplan } = useSearchStudyplan()
  const router = useRouter()

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search)
    const id = searchParams.get('id')

    if (id === null) {
      if (studyplan === null) router.push('/chat')
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
      url: `/api/studyplan?id=${id}`,
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
        {studyplan !== null ? <Studyplan {...studyplan} /> : <Loading />}
      </Main>

      <Sidebar />
    </>
  )
}
