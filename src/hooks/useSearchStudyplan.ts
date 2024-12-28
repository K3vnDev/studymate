import { useStudyplansStore } from '@/store/useStudyplansStore'
import type { StudyplanSaved } from '@/types.d'
import { useEffect, useState } from 'react'

export const useSearchStudyplan = (id?: string) => {
  const searchStudyplan = (id: string) => storedStudyplans.find(s => s.id === id) ?? null
  const storedStudyplans = useStudyplansStore(s => s.studyplans)

  const initialState = id ? searchStudyplan(id) : null
  const [studyplan, setStudyplan] = useState<StudyplanSaved | null>(initialState)

  useEffect(() => {
    if (studyplan === null && id) setStudyplan(searchStudyplan(id))
  }, [storedStudyplans])

  return { studyplan, searchStudyplan } as const
}
