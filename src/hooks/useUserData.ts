import { dataFetch } from '@/lib/utils/dataFetch'
import { useUserStore } from '@/store/useUserStore'
import type { DBStudyplansLists } from '@/types'
import { useEffect } from 'react'

export const useUserData = () => {
  const lists = useUserStore(s => s.studyplansLists)
  const setStudyplansLists = useUserStore(s => s.setStudyplansLists)

  const setIsLoadingData = useUserStore(s => s.setIsLoadingData)
  const isLoadingData = useUserStore(s => s.isLoadingData)

  useEffect(() => {
    // If the lists are already loaded or if we are currently loading data, do nothing
    if (isLoadingData || Object.entries(lists).length > 0) return

    // Fetch the lists from the API
    setIsLoadingData(true)

    dataFetch<DBStudyplansLists['studyplans_lists']>({
      url: '/api/user/lists',
      onSuccess: data => setStudyplansLists(() => data),
      onFinish: () => setIsLoadingData(false)
    })
  }, [])

  return { lists }
}
