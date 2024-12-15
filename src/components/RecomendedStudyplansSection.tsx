import { dataFetch } from '@/lib/utils/dataFetch'
import { useStudyplansStore } from '@/store/useStudyplansStore'
import type { Studyplan } from '@/types'
import { useEffect } from 'react'
import { Header } from './Header'
import { StudyplanItem } from './StudyplanItem'

export const RecomendedStudyplansSection = () => {
  const setStudyplans = useStudyplansStore(s => s.setStudyplans)
  const studyplans = useStudyplansStore(s => s.studyplans)

  useEffect(() => {
    if (studyplans.recomended.length) return

    dataFetch<Studyplan[]>({
      url: '/api/studyplan',
      onSuccess: data => {
        setStudyplans({ ...studyplans, recomended: data })
      }
    })
  }, [])

  return (
    <section className='flex flex-col gap-4'>
      <Header>Study Plans for You</Header>
      {studyplans.recomended.length > 0 && (
        <ul className='flex gap-4'>
          {studyplans.recomended.map(studyplan => (
            <StudyplanItem key={studyplan.id} {...studyplan} />
          ))}
        </ul>
      )}
    </section>
  )
}
