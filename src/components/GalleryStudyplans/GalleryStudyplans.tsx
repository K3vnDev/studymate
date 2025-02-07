import { dataFetch } from '@/lib/utils/dataFetch'
import { repeat } from '@/lib/utils/repeat'
import { useStudyplansStore } from '@/store/useStudyplansStore'
import { type UserStore, useUserStore } from '@/store/useUserStore'
import { Header } from '@components/Header'
import { CONTENT_JSON } from '@consts'
import type { StudyplanSaved } from '@types'
import { useEffect } from 'react'
import { TileStudyplan } from './TileStudyplan'
import { TileStudyPlanFallback } from './TileStudyplanFallback'

interface Props {
  title: string
  storeKey: keyof UserStore['studyplansLists']
  maxItems: number
}

export const GalleryStudyplans = ({ title, storeKey, maxItems }: Props) => {
  const studyplansLists = useUserStore(s => s.studyplansLists)
  const addStudyplans = useStudyplansStore(s => s.addStudyplans)
  const studyplans = studyplansLists[storeKey]?.slice(0, maxItems)

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
      <ul className='flex flex-wrap gap-4'>
        {studyplans
          ? studyplans.map(id => <TileStudyplan key={id} id={id} />)
          : repeat(maxItems - 1, i => <TileStudyPlanFallback key={i} />)}
      </ul>
    </section>
  )
}
