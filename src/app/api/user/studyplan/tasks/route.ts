import { Response } from '@/app/api/utils/Response'
import { databaseQuery } from '@/app/api/utils/databaseQuery'
import { getUserId } from '@/app/api/utils/getUserId'
import type { DBUserStudyplan, UserStudyplanAndCurrentDayResponse } from '@/types.d'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import type { NextRequest } from 'next/server'
import { z } from 'zod'

// Complete a task
export const POST = async (req: NextRequest) => {
  const supabase = createServerComponentClient({ cookies })

  let newStudyplan: DBUserStudyplan
  let taskIndex: number

  try {
    const { index } = (await req.json()) as { index?: number }
    taskIndex = await z.number().parseAsync(index)
  } catch {
    return Response(false, 401)
  }

  const userId = await getUserId({ supabase })
  if (userId === null) return Response(false, 401)

  // Fetch values from database
  try {
    const data = await databaseQuery<UserStudyplanAndCurrentDayResponse[]>({
      query: s => s.from('users').select('studyplan, current_studyplan_day'),
      supabase
    })
    if (data === null) return Response(false, 500)

    const [{ studyplan, current_studyplan_day }] = data
    if (!studyplan || !current_studyplan_day) return Response(false, 405)

    const { day } = current_studyplan_day

    // Update tasks value
    studyplan.daily_lessons[day - 1].tasks[taskIndex].done = true
    newStudyplan = studyplan
  } catch {
    return Response(false, 500)
  }

  // Update values on database
  try {
    await databaseQuery({
      query: s => s.from('users').update({ studyplan: newStudyplan }).eq('id', userId),
      supabase
    })
    return Response(true, 201)
  } catch {
    return Response(false, 500)
  }
}
