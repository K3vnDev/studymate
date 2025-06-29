import { dateSubstraction } from '@/lib/utils/dateSubstraction'
import { response } from '@/app/api/utils/response'
import { abandonStudyplan } from '@api/utils/abandonStudyplan'
import { dataParser } from '@api/utils/dataParser'
import { databaseQuery } from '@api/utils/databaseQuery'
import { getStudyplan } from '@api/utils/getStudyplan'
import { getUserId } from '@api/utils/getUserId'
import { modifyStudyplansLists } from '@api/utils/modifyStudyplansLists'
import { StudyplanSchema } from '@schemas/Studyplan'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import type {
  DBCurrentStudyplanDay,
  DBUserStudyplanAndCurrentDayResponse,
  StudyplanSaved,
  StudyplanUnSaved,
  UserStudyplan
} from '@types'
import { cookies } from 'next/headers'
import type { NextRequest } from 'next/server'

// Get user studyplan and current day
export const GET = async () => {
  const supabase = createServerComponentClient({ cookies })

  const userId = await getUserId({ supabase })
  if (userId === null) return response(false, 401)

  try {
    let data = await databaseQuery<DBUserStudyplanAndCurrentDayResponse[]>(
      supabase.from('users').select('studyplan, current_studyplan_day')
    )

    const [{ studyplan, current_studyplan_day }] = data

    if (!studyplan || !current_studyplan_day) {
      return response(true, 200, { data: null })
    }

    const { day, last_updated } = current_studyplan_day

    const todaysTasksAreDone = studyplan.daily_lessons[day - 1].tasks.every(t => t.done)
    const isOnLastDay = studyplan.daily_lessons.length === day
    const tasksWereCompletedBeforeToday = dateSubstraction(last_updated.slice(0, 10)) < 0

    // Increase studyplan current day if its allowed
    if (todaysTasksAreDone && !isOnLastDay && tasksWereCompletedBeforeToday) {
      const current_studyplan_day = dataParser.fromNumberToCurrentStudyplanDay(day + 1)

      try {
        const data = await databaseQuery<DBCurrentStudyplanDay[]>(
          supabase.from('users').update({ current_studyplan_day }).eq('id', userId).select()
        )
        if (!data) return response(false, 500)
      } catch {
        return response(false, 500)
      }

      data = [{ studyplan, current_studyplan_day }]
    }

    return response(true, 200, { data: dataParser.fromDBResponseToUserStudyplan(data) })
  } catch {
    return response(false, 500)
  }
}

// Start a studyplan
export const POST = async (req: NextRequest) => {
  const reqData = await req.json()
  const supabase = createServerComponentClient({ cookies })

  let studyplanFromReq: StudyplanSaved | StudyplanUnSaved
  let original_id: string

  const userId = await getUserId({ supabase })
  if (userId === null) return response(false, 401)

  try {
    studyplanFromReq = await StudyplanSchema.parseAsync(reqData)
  } catch {
    return response(false, 400, { msg: "Sent studyplan doesn't follow the schema" })
  }

  // Create a new studyplan if no one matches the id
  try {
    const existingStudyplan = await getStudyplan({ id: reqData?.id, supabase })

    if (existingStudyplan === null) {
      const [data] = await databaseQuery<StudyplanSaved[]>(
        supabase.from('studyplans').insert(studyplanFromReq).select()
      )
      original_id = data.id
    } else {
      const { id, ...studyplan } = existingStudyplan

      studyplanFromReq = studyplan
      original_id = id
    }
  } catch {
    return response(false, 500)
  }

  // Save a copy of the studyplan on the user
  try {
    const current_studyplan_day = dataParser.fromNumberToCurrentStudyplanDay(1)

    // Undone all daily lessons
    const daily_lessons = studyplanFromReq.daily_lessons.map(d => {
      return { ...d, tasks: d.tasks.map(t => ({ ...t, done: false })) }
    })

    const data = await databaseQuery<DBUserStudyplanAndCurrentDayResponse[]>(
      supabase
        .from('users')
        .update({
          studyplan: { ...studyplanFromReq, daily_lessons, original_id },
          current_studyplan_day
        })
        .eq('id', userId)
        .select()
    )
    return response(true, 201, { data: dataParser.fromDBResponseToUserStudyplan(data) })
  } catch {
    return response(false, 500)
  }
}

// Abandon studyplan
export const DELETE = async () => {
  const supabase = createServerComponentClient({ cookies })

  const userId = await getUserId({ supabase })
  if (userId === null) return response(false, 401)

  try {
    await abandonStudyplan({ supabase, userId })
    return response(true, 200)
  } catch {
    return response(false, 500)
  }
}

// Complete studyplan
export const PUT = async () => {
  const supabase = createServerComponentClient({ cookies })

  const userId = await getUserId({ supabase })
  if (userId === null) return response(false, 401)

  let originalId: string

  try {
    // Get original id
    type QueryResponse = { studyplan: UserStudyplan | null }
    const [{ studyplan }] = await databaseQuery<QueryResponse[]>(supabase.from('users').select('studyplan'))
    if (studyplan === null) {
      return response(false, 405, { msg: "User doesn't have a studyplan" })
    }

    const { original_id, daily_lessons } = studyplan
    originalId = original_id

    // Check if all tasks are done
    if (!daily_lessons.every(d => d.tasks.every(t => t.done))) {
      return response(false, 403, { msg: 'All tasks must be done' })
    }

    // Abandon studyplan
    await abandonStudyplan({ supabase, userId })
  } catch {
    return response(false, 500)
  }

  try {
    await modifyStudyplansLists({ supabase, modifyId: originalId, key: 'completed', userId }).add()
    return response(true, 200, { data: originalId })
  } catch {
    return response(false, 500)
  }
}
