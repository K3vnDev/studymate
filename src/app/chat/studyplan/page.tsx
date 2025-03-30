'use client'

import { useStudyplansStore } from '@/store/useStudyplansStore'
import { BlurredPoint, Background } from '@/components/Background/Background'
import { Main } from '@components/Main'
import { Sidebar } from '@components/Sidebar'
import { Studyplan } from '@components/Studyplan/Studyplan'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function ChatStudyplanPage() {
  const studyplan = useStudyplansStore(s => s.studyplan)
  const router = useRouter()

  useEffect(() => {
    if (studyplan === null) {
      router.push('/chat')
    }
  }, [])

  return (
    <Main className='gap-12 h-full relative'>
      {studyplan !== null ? <Studyplan {...{ studyplan }} /> : null}
    </Main>
  )
}
