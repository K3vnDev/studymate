import { type SupabaseClient, createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

interface Params {
  supabase?: SupabaseClient<any, 'public', any>
}

export const getUserId = async ({ supabase = createServerComponentClient({ cookies }) }: Params) => {
  const { data } = await supabase.auth.getUser()
  if (data.user === null) {
    return null
  }
  return data.user.id
}
