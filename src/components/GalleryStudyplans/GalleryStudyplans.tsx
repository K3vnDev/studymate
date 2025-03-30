'use client'

import { useResponsiveness } from '@/hooks/useResponsiveness'
import { dataFetch } from '@/lib/utils/dataFetch'
import { repeat } from '@/lib/utils/repeat'
import { useStudyplansStore } from '@/store/useStudyplansStore'
import type { UserStore } from '@/store/useUserStore'
import { Header } from '@components/Header'
import { CONTENT_JSON, SCREENS } from '@consts'
import type { StudyplanSaved } from '@types'
import { useEffect } from 'react'
import { TileStudyplan } from './TileStudyplan'
import { TileStudyPlanFallback } from './TileStudyplanFallback'
import { useUserData } from '@/hooks/useUserData'

interface Props {
  title: string
  storeKey: keyof UserStore['studyplansLists']
  itemsCount: {
    max: number
    min: number
  }
}

export const GalleryStudyplans = ({ title, storeKey, itemsCount }: Props) => {
  const addStudyplans = useStudyplansStore(s => s.addStudyplans)
  const { screenSize } = useResponsiveness()
  const { lists: studyplansLists } = useUserData()

  const items_n = screenSize.x >= SCREENS.MD ? itemsCount.max : itemsCount.min
  const studyplans = studyplansLists[storeKey]?.slice(0, items_n)

  useEffect(() => {
    if (!studyplansLists[storeKey]) return

    dataFetch<StudyplanSaved[]>({
      url: '/api/studyplans',
      options: {
        method: 'POST',
        headers: CONTENT_JSON,
        body: JSON.stringify(studyplansLists[storeKey])
      },
      onSuccess: data => addStudyplans(...data)
    })
  }, [studyplansLists[storeKey]])

  return (
    <section className='flex flex-col gap-4'>
      {studyplans ? (
        <Header>{title}</Header>
      ) : (
        <div className='bg-zinc-700 animate-pulse rounded-lg w-48 h-8' />
      )}
      <ul className='grid md:grid-cols-3 grid-cols-2 gap-4'>
        {studyplans
          ? studyplans.map(id => <TileStudyplan key={id} id={id} />)
          : repeat(items_n, i => <TileStudyPlanFallback key={i} />)}
      </ul>
    </section>
  )
}
