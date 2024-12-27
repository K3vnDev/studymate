import { type SupabaseClient, createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import type { PostgrestSingleResponse } from '@supabase/supabase-js'
import { cookies } from 'next/headers'

interface Params {
  query: (supabase: SupabaseClient<any, 'public', any>) => any
  supabase?: SupabaseClient<any, 'public', any>
}

export const databaseQuery = async <T>({
  query,
  supabase = createServerComponentClient({ cookies })
}: Params) => {
  const { data, error }: PostgrestSingleResponse<T> = await query(supabase)

  if (error !== null) {
    throw new Error()
  }
  return data as T
}
