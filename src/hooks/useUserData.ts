import { dataFetch } from '@/lib/utils/dataFetch'
import { useUserStore } from '@/store/useUserStore'
import type { StudyplansListsResponse } from '@/types'
import { useEffect } from 'react'

export const useUserData = () => {
  const { recomended, completed, saved } = useUserStore(s => s.studyplansLists)
  const setStudyplansLists = useUserStore(s => s.setStudyplansLists)

  useEffect(() => {
    if (recomended && completed && saved) return

    dataFetch<StudyplansListsResponse['studyplans_lists']>({
      url: '/api/user/lists',
      onSuccess: data => setStudyplansLists(() => data)
    })
  }, [])
}
