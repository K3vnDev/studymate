import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { databaseQuery } from '@api/utils/databaseQuery'
import { getUserId } from '@api/utils/getUserId'
import { Response } from '@api/utils/Response'
import type { DBUserData } from '@types'

export const GET = async () => {
  const supabase = createServerComponentClient({ cookies })

  const userId = await getUserId({ supabase })
  if (userId === null) return Response(false, 401)

  try {
    const [userData] = await databaseQuery<DBUserData[]>(
      supabase.from('users').select('id, user_name, avatar_url').eq('id', userId)
    )
    return Response(true, 200, { data: userData })
  } catch {
    return Response(false, 500)
  }
}
