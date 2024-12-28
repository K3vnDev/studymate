import type { StudyplansListsResponse } from '@/types'
import { Response } from '@api/utils/Response'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { databaseQuery } from '../../utils/databaseQuery'

export const GET = async () => {
  const supabase = createServerComponentClient({ cookies })

  try {
    const data = await databaseQuery<StudyplansListsResponse[]>({
      query: s => s.from('users').select('studyplans_lists'),
      supabase
    })
    return Response(true, 200, { data: data[0].studyplans_lists })
  } catch {
    return Response(false, 500)
  }
}
