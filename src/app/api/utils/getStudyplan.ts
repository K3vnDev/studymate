import type { StudyplanSaved } from '@/types.d'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import type { SupabaseClient } from '@supabase/supabase-js'
import { cookies } from 'next/headers'
import { databaseQuery } from './databaseQuery'

interface Params {
  id: string
  supabase?: SupabaseClient<any, 'public', any>
}

export const getStudyplan = async ({ id, supabase = createServerComponentClient({ cookies }) }: Params) => {
  try {
    const data = await databaseQuery<StudyplanSaved[]>(
      supabase.from('studyplans').select('id, name, desc, category, daily_lessons').eq('id', id)
    )
    if (data === null || !data.length) return null
    return data[0]
  } catch {
    return null
  }
}
