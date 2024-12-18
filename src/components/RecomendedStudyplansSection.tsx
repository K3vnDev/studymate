import { dataFetch } from '@/lib/utils/dataFetch'
import { useStudyplansStore } from '@/store/useStudyplansStore'
import type { StudyplanSaved } from '@/types.d'
import { useEffect } from 'react'
import { Header } from './Header'
import { ItemStudyplan } from './ItemStudyplan'

export const RecomendedStudyplansSection = () => {
  const setStoreStudyplans = useStudyplansStore(s => s.setStudyplans)
  const storeStudyplans = useStudyplansStore(s => s.studyplans)

  useEffect(() => {
    if (storeStudyplans.recomended.length) return

    dataFetch<StudyplanSaved[]>({
      url: '/api/studyplan',
      onSuccess: data => {
        setStoreStudyplans({ ...storeStudyplans, recomended: data })
      }
    })
  }, [])

  return (
    <section className='flex flex-col gap-4'>
      <Header>Study Plans for You</Header>
      {storeStudyplans.recomended.length > 0 && (
        <ul className='flex gap-4'>
          {storeStudyplans.recomended.map(({ daily_lessons, created_by, desc, ...studyplan }) => (
            <ItemStudyplan key={studyplan.id} {...{ ...studyplan, days: daily_lessons.length }} />
          ))}
        </ul>
      )}
    </section>
  )
}
