import type { DBStudyplansLists } from '@/types'
import { databaseQuery } from '@api/utils/databaseQuery'
import { type SupabaseClient, createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

interface Params {
  supabase?: SupabaseClient<any, 'public', any>
  userId: string
  key: keyof DBStudyplansLists['studyplans_lists']
  modifyId: string
}

export const modifyStudyplansLists = ({
  supabase = createServerComponentClient({ cookies }),
  userId,
  key,
  modifyId
}: Params) => {
  // Get studyplans list
  const getStudyplansList = async () => {
    const data = await databaseQuery<DBStudyplansLists[]>(supabase.from('users').select('studyplans_lists'))
    return data[0].studyplans_lists
  }

  const saveChanges = async (studyplans_lists: DBStudyplansLists['studyplans_lists']) => {
    await databaseQuery(supabase.from('users').update({ studyplans_lists }).eq('id', userId))
  }

  return {
    add: async () => {
      const studyplansLists = await getStudyplansList()
      const existingIndex = studyplansLists[key].findIndex(k => k === modifyId)
      if (existingIndex !== -1) return false

      studyplansLists[key].push(modifyId)
      await saveChanges(studyplansLists)
      return true
    },

    remove: async () => {
      const studyplansLists = await getStudyplansList()
      const existingIndex = studyplansLists[key].findIndex(k => k === modifyId)
      if (existingIndex === -1) return false

      studyplansLists[key].splice(existingIndex, 1)
      await saveChanges(studyplansLists)
      return true
    }
  }
}
