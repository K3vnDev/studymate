import type { DBStudyplansLists } from '@/types'
import { Response } from '@api/utils/Response'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { databaseQuery } from '../../utils/databaseQuery'

export const GET = async () => {
  const supabase = createServerComponentClient({ cookies })

  try {
    const data = await databaseQuery<DBStudyplansLists[]>(supabase.from('users').select('studyplans_lists'))

    if (data.length === 0) {
      return Response(false, 401)
    }

    const [{ studyplans_lists }] = data
    return Response(true, 200, { data: studyplans_lists })
  } catch {
    return Response(false, 500)
  }
}
