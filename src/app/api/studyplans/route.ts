import type { StudyplanSaved } from '@/types.d'
import { Response } from '@api/utils/Response'
import { databaseQuery } from '@api/utils/databaseQuery'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import type { NextRequest } from 'next/server'
import { z } from 'zod'

// Get all studyplans
export const GET = async (req: NextRequest) => {
  let limit = 9999

  try {
    const url = new URL(req.url)
    const data = url.searchParams.get('limit')

    if (data !== null) {
      limit = await z.coerce.number().positive().parseAsync(data)
    }
  } catch {
    return Response(false, 400)
  }

  const supabase = createServerComponentClient({ cookies })

  try {
    const data = await databaseQuery<StudyplanSaved[]>(
      supabase.from('studyplans').select('id, name, desc, category, daily_lessons').limit(limit)
    )
    return Response(true, 200, { data })
  } catch {
    return Response(false, 500)
  }
}

// Get studyplans by ids
export const POST = async (req: NextRequest) => {
  let idList: string[]

  try {
    const data = await req.json()

    idList = await z.array(z.string()).parseAsync(data)
  } catch {
    return Response(false, 400)
  }

  const supabase = createServerComponentClient({ cookies })

  try {
    const data = await databaseQuery<StudyplanSaved[]>(
      supabase.from('studyplans').select('id, name, desc, category, daily_lessons').in('id', idList)
    )
    return Response(true, 200, { data })
  } catch {
    return Response(false, 404)
  }
}
