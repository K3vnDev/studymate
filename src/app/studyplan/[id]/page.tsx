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
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useParams, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function PublicStudyplanPage() {
  const studyplan = useStudyplansStore(s => s.studyplan)
  const setStudyplan = useStudyplansStore(s => s.setStudyplan)
  const addStudyplans = useStudyplansStore(s => s.addStudyplans)
  const [hasSession, setHasSession] = useState<boolean | undefined>(undefined)

  const { id } = useParams()
  const router = useRouter()

  const { searchStudyplan } = useSearchStudyplan()
  useUserData()

  const checkSession = async () => {
    const {
      data: { session }
    } = await createClientComponentClient().auth.getSession()

    setHasSession(session !== null)
  }

  const handleStudyplanLoad = () => {
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
  }

  useEffect(() => {
    checkSession()
    handleStudyplanLoad()
  }, [])

  const justifySelf = !hasSession ? 'justify-self-center' : ''

  if (hasSession === undefined) {
    return null
  }

  return (
    <>
      <Main className={`${justifySelf} gap-12 px-24 py-12 h-full relative`}>
        <Loadable isLoading={!studyplan}>{studyplan && <Studyplan {...{ studyplan }} />}</Loadable>
      </Main>

      {hasSession && <Sidebar />}
    </>
  )
}
