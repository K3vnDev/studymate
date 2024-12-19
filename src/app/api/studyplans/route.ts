import { StudyplanSchema } from '@/lib/schemas/Studyplan'
import type { StudyplanSaved, StudyplanUnSaved } from '@/types.d'
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

// Start a studyplan
export const POST = async (req: NextRequest) => {
  const reqData = await req.json()
  const supabase = createServerComponentClient({ cookies })

  let studyplanFromReq: StudyplanSaved | StudyplanUnSaved

  // biome-ignore format: <>
  const { data: { user } } = await supabase.auth.getUser()
  if (user === null) return Response(false, 401)
  const { id: userId } = user

  try {
    studyplanFromReq = await StudyplanSchema.parseAsync(reqData)
  } catch {
    return Response(false, 400)
  }

  // Create a new studyplan if no one matches the id
  const existingStudyplan = await getStudyplan(reqData.id)
  let original_id: string

  if (existingStudyplan === null) {
    const { data, error } = await supabase.from('studyplans').insert(studyplanFromReq).select()

    if (error !== null || data == null) {
      return Response(false, 500)
    }
    original_id = data[0].id
  } else {
    studyplanFromReq = existingStudyplan
    original_id = existingStudyplan.id
  }

  // Save a copy of the studyplan on the user
  const { data, error } = await supabase
    .from('users')
    .update({ studyplan: { ...studyplanFromReq, original_id } })
    .eq('id', userId)
    .select()

  if (error !== null || data === null) {
    return Response(false, 500)
  }

  return Response(true, 201, { data: data[0].studyplan })
}
