import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

export const getUserId = async ({ supabase = createServerComponentClient({ cookies }) }) => {
  const { data } = await supabase.auth.getUser()
  if (data.user === null) {
    return null
  }
  return data.user.id
}
