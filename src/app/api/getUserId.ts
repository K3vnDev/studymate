import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import type { SupabaseClient } from '@supabase/supabase-js'
import { cookies } from 'next/headers'

export const getUserId = async (
  supabase: SupabaseClient = createServerComponentClient({ cookies })
) => {
  const { data } = await supabase.auth.getUser()
  if (data.user === null) {
    return null
  }
  return data.user.id
}
