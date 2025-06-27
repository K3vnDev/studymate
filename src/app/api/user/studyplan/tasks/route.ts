import { response } from '@/app/api/utils/response'
import { databaseQuery } from '@api/utils/databaseQuery'
import { getUserId } from '@api/utils/getUserId'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import type { DBUserStudyplan, DBUserStudyplanAndCurrentDayResponse } from '@types'
import { cookies } from 'next/headers'
import type { NextRequest } from 'next/server'
import { z } from 'zod'

// Complete a task
export const POST = async (req: NextRequest) => {
  const supabase = createServerComponentClient({ cookies })

  let newStudyplan: DBUserStudyplan
  let taskIndex: number

  try {
    const { index } = await req.json()
    taskIndex = await z.number().nonnegative().parseAsync(index)
  } catch {
    return response(false, 400, { msg: 'Task index is missing or invalid' })
  }

  const userId = await getUserId({ supabase })
  if (userId === null) return response(false, 401)

  try {
    // Fetch studyplan and current day from database
    const data = await databaseQuery<DBUserStudyplanAndCurrentDayResponse[]>(
      supabase.from('users').select('studyplan, current_studyplan_day')
    )
    const [{ studyplan, current_studyplan_day }] = data

    if (!studyplan || !current_studyplan_day) {
      return response(false, 405, { msg: "User doesn't have a studyplan" })
    }

    const dayIndex = current_studyplan_day.day - 1
    const { tasks } = studyplan.daily_lessons[dayIndex]

    if (taskIndex > tasks.length - 1) {
      return response(false, 405, { msg: 'Task index is out of bounds' })
    }

    // Update tasks value
    studyplan.daily_lessons[dayIndex].tasks[taskIndex].done = true
    newStudyplan = studyplan
  } catch {
    return response(false, 500)
  }

  // Update values on database
  try {
    await databaseQuery(supabase.from('users').update({ studyplan: newStudyplan }).eq('id', userId))
    return response(true, 201)
  } catch {
    return response(false, 500)
  }
}
