import { StudyplanSchema } from '@/lib/schemas/Studyplan'
import type {
  StudyplanSaved,
  StudyplanUnSaved,
  UserStudyplanAndCurrentDayResponse
} from '@/types.d'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import type { NextRequest } from 'next/server'
import { Response } from '../../utils/Response'
import { dataParser } from '../../utils/dataParser'
import { databaseQuery } from '../../utils/databaseQuery'
import { getStudyplan } from '../../utils/getStudyplan'
import { getUserId } from '../../utils/getUserId'

// Get user studyplan and current day
export const GET = async () => {
  const supabase = createServerComponentClient({ cookies })

  try {
    const data = await databaseQuery<UserStudyplanAndCurrentDayResponse[]>({
      query: s => s.from('users').select('studyplan, current_studyplan_day'),
      supabase
    })
    if (data === null) return Response(false, 500)
    if (data.length === 0) return Response(false, 401)

    return Response(true, 200, { data: dataParser.DBResponseToUserStudyplan(data) })
  } catch {
    return Response(false, 500)
  }
}

// Start a studyplan
export const POST = async (req: NextRequest) => {
  const reqData = await req.json()
  const supabase = createServerComponentClient({ cookies })

  let studyplanFromReq: StudyplanSaved | StudyplanUnSaved
  let original_id: string

  const userId = await getUserId({ supabase })
  if (userId === null) return Response(false, 401)

  try {
    studyplanFromReq = await StudyplanSchema.parseAsync(reqData)
  } catch {
    return Response(false, 400)
  }

  // Create a new studyplan if no one matches the id
  try {
    const existingStudyplan = await getStudyplan({ id: reqData.id, supabase })

    if (existingStudyplan === null) {
      const data = await databaseQuery<StudyplanSaved[]>({
        query: s => s.from('studyplans').insert(studyplanFromReq).select(),
        supabase
      })

      if (data === null) {
        return Response(false, 500)
      }
      original_id = data[0].id
    } else {
      const { id, ...studyplan } = existingStudyplan

      studyplanFromReq = studyplan
      original_id = id
    }
  } catch {
    return Response(false, 500)
  }

  // Save a copy of the studyplan on the user
  try {
    const current_studyplan_day = {
      day: 1,
      last_updated: new Date()
    }

    // biome-ignore format: <>
    const data = await databaseQuery<any>({
      query: s => s
        .from('users')
        .update({ studyplan: { ...studyplanFromReq, original_id }, current_studyplan_day })
        .eq('id', userId)
        .select()
    })

    if (data === null) {
      return Response(false, 500)
    }
    return Response(true, 201, { data: dataParser.DBResponseToUserStudyplan(data) })
  } catch {
    return Response(false, 500)
  }
}
