'use client'

import { dataFetch } from '@/lib/utils/dataFetch'
import { useStudyplansStore } from '@/store/useStudyplansStore'
import { Button, ErrorCard, Gigant, Message } from '@components/ErrorCard'
import { Loadable } from '@components/Loadable'
import { Main } from '@components/Main'
import { Sidebar } from '@components/Sidebar'
import { Studyplan } from '@components/Studyplan/Studyplan'
import { ArrowIcon } from '@components/icons'
import { CONTENT_JSON } from '@consts'
import { useSearchStudyplan } from '@hooks/useSearchStudyplan'
import { useUserData } from '@hooks/useUserData'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import type { StudyplanSaved } from '@types'
import { useParams, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function PublicStudyplanPage() {
  const studyplan = useStudyplansStore(s => s.studyplan)
  const setStudyplan = useStudyplansStore(s => s.setStudyplan)
  const addStudyplans = useStudyplansStore(s => s.addStudyplans)
  const [hasSession, setHasSession] = useState<boolean | undefined>(undefined)

  const [isOnError, setIsOnError] = useState(false)

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
      },
      onError: () => setIsOnError(true)
    })
  }

  useEffect(() => {
    checkSession()
    handleStudyplanLoad()
  }, [])

  const justifySelf = !hasSession ? 'justify-self-center' : ''

  const goHome = () => router.replace('/dashboard')

  if (hasSession === undefined) {
    return null
  }

  return (
    <>
      <Main className={`${justifySelf} gap-12 px-24 py-12 h-full relative`}>
        {!isOnError ? (
          <Loadable isLoading={!studyplan}>{studyplan && <Studyplan {...{ studyplan }} />}</Loadable>
        ) : (
          <ErrorCard className='self-center'>
            <Gigant>Uh oh... 404</Gigant>
            <Message>That studyplan doesn't exist</Message>
            <Button onClick={goHome}>
              <ArrowIcon className='rotate-90 group-active:-translate-x-1.5 transition' />
              Go home
            </Button>
          </ErrorCard>
        )}
      </Main>

      {hasSession && <Sidebar />}
    </>
  )
}
