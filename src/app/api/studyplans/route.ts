import { Response } from '@api/response'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import type { NextRequest } from 'next/server'
import { getStudyplan } from './getStudyplan'

export const GET = async (req: NextRequest) => {
  const supabase = createServerComponentClient({ cookies })

  const url = new URL(req.url)
  const id = url.searchParams.get('id')

  try {
    if (id !== null) {
      // Get a single studyplan
      const studyplan = await getStudyplan(id)

      if (studyplan === null) return Response(false, 404)
      return Response(true, 200, { data: studyplan })
    }

    // Get all studyplans
    const { data, error } = await supabase
      .from('studyplans')
      .select('id, name, desc, category, daily_lessons')

    if (error !== null || data === null) return Response(false, 500)
    return Response(true, 200, { data })
  } catch {
    return Response(false, 500)
  }
}
