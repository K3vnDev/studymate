import { useUserStore } from '@/store/useUserStore'
import { useUserData } from './useUserData'
import { useStudyplansStore } from '@/store/useStudyplansStore'
import { useEffect, useState } from 'react'
import { useUserStudyplan } from './useUserStudyplan'
import type { Props } from '@/components/Studyplan/Studyplan'

interface Params {
  studyplan: Props['studyplan']
  usersCurrent: boolean
}

export const useStudyplan = ({ studyplan, usersCurrent }: Params) => {
  const { completed } = useUserStore(s => s.studyplansLists)
  const { lists } = useUserData()
  const [isLoadingUserData, setIsLoadingUserData] = useState(true)
  const { userStudyplan, isLoading: isLoadingUserStudyplan, getUtilityValues } = useUserStudyplan()

  const setStateStudyplan = useStudyplansStore(s => s.setStudyplan)
  useEffect(() => setStateStudyplan(studyplan), [])

  // Handle isLoadingUserData value
  useEffect(() => {
    if (isLoadingUserData) {
      const objList = Object.entries(lists)
      const userListsWereLoaded = objList.every(l => l[1])

      if (userListsWereLoaded && !isLoadingUserStudyplan) {
        setIsLoadingUserData(false)
      }
    }
  }, [lists, isLoadingUserStudyplan])

  // Set variables for context
  const isCompleted = completed?.some(completedId => completedId === studyplan.id) ?? false
  const justCompleted = (getUtilityValues()?.allTasksAreCompleted ?? false) && usersCurrent
  const publicId = studyplan.id ?? studyplan.original_id ?? null
  const userHasAnotherStudyplan = !!userStudyplan && !usersCurrent
  const isSaved = !!(publicId && lists?.saved && lists.saved.some(id => id === publicId))

  return {
    context: {
      studyplan,
      usersCurrent,
      isLoadingUserData,

      isCompleted,
      justCompleted,
      publicId,
      userHasAnotherStudyplan,
      isSaved
    },
    userStudyplan
  }
}
