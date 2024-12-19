import type { StudyplanSaved } from '@/types.d'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

export const getStudyplan = async (id: string) => {
  if (typeof id !== 'string') return null

  const { data, error } = await createServerComponentClient({ cookies })
    .from('studyplans')
    .select('id, name, desc, category, daily_lessons')
    .eq('id', id)

  if (error !== null || data === null || !data.length) return null
  return data[0] as StudyplanSaved
}
