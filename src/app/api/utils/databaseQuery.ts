import { type SupabaseClient, createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import type { PostgrestSingleResponse } from '@supabase/supabase-js'
import { cookies } from 'next/headers'

interface Params {
  query: (supabase: SupabaseClient<any, 'public', any>) => any
  supabase?: SupabaseClient<any, 'public', any>
  safeMode?: boolean
}

export const databaseQuery = async <T>({
  query,
  supabase = createServerComponentClient({ cookies }),
  safeMode = false
}: Params) => {
  const { data, error }: PostgrestSingleResponse<T> = await query(supabase)

  if (error !== null) {
    if (safeMode) return null
    throw new Error(JSON.stringify(error))
  }
  return data as T
}
