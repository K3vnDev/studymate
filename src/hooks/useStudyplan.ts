import { useUserStore } from '@/store/useUserStore'
import { useUserData } from './useUserData'
import { useStudyplansStore } from '@/store/useStudyplansStore'
import { useEffect } from 'react'
import { useUserStudyplan } from './useUserStudyplan'
import type { Props } from '@/components/Studyplan/Studyplan'
import { StudyplanContext } from '@/lib/context/StudyplanContext'

interface Params {
  studyplan: Props['studyplan']
  usersCurrent: boolean
}

export const useStudyplan = ({ studyplan, usersCurrent }: Params) => {
  const { completed } = useUserStore(s => s.studyplansLists)
  const { lists } = useUserData()

  const setStateStudyplan = useStudyplansStore(s => s.setStudyplan)
  useEffect(() => setStateStudyplan(studyplan), [])

  const { userStudyplan, getUtilityValues } = useUserStudyplan()
  const justCompleted = (getUtilityValues()?.allTasksAreCompleted ?? false) && usersCurrent

  const isCompleted = completed?.some(completedId => completedId === studyplan.id) ?? false

  const userHasAnotherStudyplan = !!userStudyplan && !usersCurrent

  const publicId = studyplan.id ?? studyplan.original_id ?? null

  const isSaved = !!(publicId && lists?.saved && lists.saved.some(id => id === publicId))

  return {
    context: {
      studyplan,
      isCompleted,
      isSaved,
      justCompleted,
      usersCurrent,
      userHasAnotherStudyplan,
      publicId
    },
    userStudyplan
  }
}
