import type { StudyplanSaved } from '@/types.d'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import type { NextRequest } from 'next/server'
import { Response } from '../utils/Response'
import { databaseQuery } from '../utils/databaseQuery'
import { getStudyplan } from '../utils/getStudyplan'

export const GET = async (req: NextRequest) => {
  const supabase = createServerComponentClient({ cookies })

  const url = new URL(req.url)
  const id = url.searchParams.get('id')

  // Get a single studyplan
  try {
    if (id !== null) {
      const studyplan = await getStudyplan({ id, supabase })

      if (studyplan === null) return Response(false, 404)
      return Response(true, 200, { data: studyplan })
    }
  } catch {
    return Response(false, 404)
  }

  // Get all studyplans
  try {
    const data = await databaseQuery<StudyplanSaved[]>({
      query: s => s.from('studyplans').select('id, name, desc, category, daily_lessons'),
      supabase
    })
    return Response(true, 200, { data })
  } catch {
    return Response(false, 500)
  }
}
