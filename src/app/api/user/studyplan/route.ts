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
import { dateSubstraction } from '../../utils/dateSubstraction'
import { generateCurrentStudyplanDay } from '../../utils/generateCurrentStudyplanDay'
import { getStudyplan } from '../../utils/getStudyplan'
import { getUserId } from '../../utils/getUserId'

// Get user studyplan and current day
export const GET = async () => {
  const supabase = createServerComponentClient({ cookies })

  const userId = await getUserId({ supabase })
  if (userId === null) return Response(false, 401)

  try {
    let data = await databaseQuery<UserStudyplanAndCurrentDayResponse[]>({
      query: s => s.from('users').select('studyplan, current_studyplan_day'),
      supabase
    })

    if (data === null || data.length === 0) {
      return Response(false, 500)
    }

    const [{ studyplan, current_studyplan_day }] = data

    if (!studyplan || !current_studyplan_day) {
      return Response(true, 200, { data: null })
    }

    const { day, last_updated } = current_studyplan_day

    const todaysTasksAreDone = studyplan.daily_lessons[day - 1].tasks.every(t => t.done)
    const isOnLastDay = studyplan.daily_lessons.length === day
    const tasksWereCompletedBeforeToday = dateSubstraction(last_updated.slice(0, 10)) < 0

    // Increase studyplan current day if its allowed
    if (todaysTasksAreDone && !isOnLastDay && tasksWereCompletedBeforeToday) {
      const current_studyplan_day = generateCurrentStudyplanDay(day + 1)

      try {
        const data = await databaseQuery<
          Array<UserStudyplanAndCurrentDayResponse['current_studyplan_day']>
        >({
          query: s => s.from('users').update({ current_studyplan_day }).eq('id', userId).select(),
          supabase
        })
        if (!data) return Response(false, 500)
      } catch {
        return Response(false, 500)
      }

      data = [{ studyplan, current_studyplan_day }]
    }

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
    const current_studyplan_day = generateCurrentStudyplanDay(1)

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

// Abandon a studyplan
export const DELETE = async () => {
  const supabase = createServerComponentClient({ cookies })

  const userId = await getUserId({ supabase })
  if (userId === null) return Response(false, 401)

  try {
    // biome-ignore format: <>
    await databaseQuery({
      query: s => s
        .from('users')
        .update({ studyplan: null, current_studyplan_day: null })
        .eq('id', userId)
    })
    return Response(true, 200)
  } catch {
    return Response(false, 500)
  }
}
