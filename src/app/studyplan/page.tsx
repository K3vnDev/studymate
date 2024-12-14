'use client'

import { Studyplan } from '@/components/Studyplan'
import { useStudyplansStore } from '@/store/useStudyplansStore'
import type { Studyplan as StudyplanType } from '@/types'
import { dataFetch } from '@/utils/dataFetch'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'

export default function StudyplanPage() {
  const studyplan = useStudyplansStore(s => s.studyplan)
  const setStudyplan = useStudyplansStore(s => s.setStudyplan)
  const params = useSearchParams()
  const router = useRouter()

  useEffect(() => {
    const id = params.get('id')
    if (id === null) {
      if (studyplan === null) router.push('/dashboard')
      return
    }

    if (studyplan === null || studyplan.id !== id) {
      setStudyplan(null)

      dataFetch<StudyplanType>({
        url: `/api/studyplan?id=${id}`,
        onSuccess: data => {
          setStudyplan(data)
        },
        onError: () => {
          // TODO: show error to user
        }
      })
    }
  }, [])

  return (
    <main className='main gap-12 px-24 py-12 h-full'>
      {studyplan !== null && <Studyplan {...studyplan} />}
    </main>
  )
}
