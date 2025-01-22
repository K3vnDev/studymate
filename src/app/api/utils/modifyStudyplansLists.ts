import type { DBStudyplansLists } from '@/types'
import { databaseQuery } from '@api/utils/databaseQuery'
import { type SupabaseClient, createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

interface Params {
  supabase?: SupabaseClient<any, 'public', any>
  userId: string
  key: keyof DBStudyplansLists['studyplans_lists']
  id: string
}

export const modifyStudyplansLists = ({
  supabase = createServerComponentClient({ cookies }),
  userId,
  key,
  id
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
      const alreadyExists = studyplansLists[key].find(k => k === id)
      if (alreadyExists) return

      studyplansLists[key].push(id)
      await saveChanges(studyplansLists)
    },

    remove: async () => {
      const studyplansLists = await getStudyplansList()
      const index = studyplansLists[key].findIndex(k => k === id)
      if (index === -1) return

      studyplansLists[key].splice(index, 1)
      await saveChanges(studyplansLists)
    }
  }
}
