import { dataFetch } from '@/lib/utils/dataFetch'
import { useUserStore } from '@/store/useUserStore'
import type { DBStudyplansLists, DBUserData as DBProfileUserData } from '@/types'
import { useEffect } from 'react'

export const useUserData = () => {
  const studyplansLists = useUserStore(s => s.studyplansLists)
  const setStudyplansLists = useUserStore(s => s.setStudyplansLists)

  const profileData = useUserStore(s => s.profileData)
  const setProfileData = useUserStore(s => s.setProfileData)

  const setIsLoadingData = useUserStore(s => s.setIsLoadingData)
  const isLoadingData = useUserStore(s => s.isLoadingData)

  useEffect(() => {
    // If the lists and the profile data are already loaded or if we are currently loading data, do nothing
    const listsOrProfileDataLoaded = Object.entries(studyplansLists).length > 0 && profileData !== null
    if (isLoadingData || listsOrProfileDataLoaded) return

    setIsLoadingData(true)

    Promise.all([
      // Fetch the lists from the API
      dataFetch<DBStudyplansLists['studyplans_lists']>({
        url: '/api/user/lists',
        onSuccess: data => setStudyplansLists(() => data)
      }),

      // Fetch the basic user data (id, user_name, avatar_url...) from the API
      dataFetch<DBProfileUserData>({
        url: '/api/user/profile',
        onSuccess: data => setProfileData(data)
      })
    ])
      // Stop loading data when the process stops
      .finally(() => setIsLoadingData(false))
  }, [])

  return { lists: studyplansLists, profile: profileData }
}
