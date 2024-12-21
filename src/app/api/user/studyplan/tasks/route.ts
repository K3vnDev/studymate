import { getUserId } from '@/app/api/getUserId'
import { Response } from '@/app/api/response'
import type { DBUserStudyplan } from '@/types.d'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import type { NextRequest } from 'next/server'
import { z } from 'zod'

interface DBResponseSelect {
  studyplan: DBUserStudyplan | null
  current_studyplan_day: {
    day: number
    last_updated: string
  } | null
}

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
    const { data, error } = await supabase.from('users').select('studyplan, current_studyplan_day')
    if (data === null || error !== null) return Response(false, 500)

    const [{ studyplan, current_studyplan_day }] = data as DBResponseSelect[]
    if (studyplan === null || current_studyplan_day == null) return Response(false, 405)

    const { day } = current_studyplan_day

    studyplan.daily_lessons[day - 1].tasks = studyplan.daily_lessons[day - 1].tasks.map(
      (task, i) => {
        if (taskIndexes.includes(i)) return { ...task, done: true }
        return task
      }
    )
    newStudyplan = studyplan
  } catch {
    return Response(false, 500)
  }

  const userId = await getUserId(supabase)
  if (userId === null) return Response(false, 401)

  // Update values on database
  try {
    const { error } = await supabase
      .from('users')
      .update({ studyplan: newStudyplan })
      .eq('id', userId)

    if (error !== null) {
      return Response(false, 500)
    }
    return Response(true, 201)
  } catch {
    return Response(false, 500)
  }
}
