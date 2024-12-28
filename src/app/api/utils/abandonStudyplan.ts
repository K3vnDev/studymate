import { type SupabaseClient, createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { databaseQuery } from './databaseQuery'

interface Params {
  supabase?: SupabaseClient<any, 'public', any>
  userId: string
}

export const abandonStudyplan = async ({
  supabase = createServerComponentClient({ cookies }),
  userId
}: Params) => {
  try {
    await databaseQuery(
      supabase.from('users').update({ studyplan: null, current_studyplan_day: null }).eq('id', userId)
    )
    return true
  } catch {
    throw new Error()
  }
}
