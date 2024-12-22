import { Response } from '@/app/api/utils/Response'
import { databaseQuery } from '@/app/api/utils/databaseQuery'
import { getUserId } from '@/app/api/utils/getUserId'
import type { DBUserStudyplan, UserStudyplanAndCurrentDayResponse } from '@/types.d'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import type { NextRequest } from 'next/server'
import { z } from 'zod'

export const POST = async (req: NextRequest) => {
  let taskIndexes: number[]

  try {
    const data = await req.json()
    taskIndexes = z.array(z.number()).parse(data)
  } catch {
    return Response(false, 401)
  }

  const supabase = createServerComponentClient({ cookies })
  let newStudyplan: DBUserStudyplan

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
    studyplan.daily_lessons[day - 1].tasks = studyplan.daily_lessons[day - 1].tasks.map(
      (task, i) => (taskIndexes.includes(i) ? { ...task, done: true } : task)
    )
    newStudyplan = studyplan
  } catch {
    return Response(false, 500)
  }

  const userId = await getUserId({ supabase })
  if (userId === null) return Response(false, 401)

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
