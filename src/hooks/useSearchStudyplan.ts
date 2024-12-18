import { useStudyplansStore } from '@/store/useStudyplansStore'

export const useSearchStudyplan = () => {
  const studyplans = useStudyplansStore(s => s.studyplans)

  const searchStudyplan = (id: string) => {
    for (const [, studyplansArray] of Object.entries(studyplans)) {
      const studyplan = studyplansArray.find(s => s.id === id)
      if (studyplan !== undefined) return studyplan
    }
    return null
  }
  return { searchStudyplan }
}
