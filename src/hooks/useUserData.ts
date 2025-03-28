import { dataFetch } from '@/lib/utils/dataFetch'
import { useUserStore } from '@/store/useUserStore'
import type { DBStudyplansLists } from '@/types'
import { useEffect } from 'react'

export const useUserData = () => {
  const lists = useUserStore(s => s.studyplansLists)
  const setStudyplansLists = useUserStore(s => s.setStudyplansLists)
  const isLoadingData = useUserStore(s => s.isLoadingData)
  const setIsLoadingData = useUserStore(s => s.setIsLoadingData)

  useEffect(() => {
    if (isLoadingData) return

    const listsArray = Object.entries(lists)
    if (listsArray.length > 0) return
    setIsLoadingData(true)

    dataFetch<DBStudyplansLists['studyplans_lists']>({
      url: '/api/user/lists',
      onSuccess: data => setStudyplansLists(() => data),
      onFinish: () => setIsLoadingData(false)
    })
  }, [])

  return { lists }
}
