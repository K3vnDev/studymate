import type { StudyplanSaved, StudyplanUnSaved } from '@types'
import { databaseQuery } from '@api/utils/databaseQuery'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import type { NextRequest } from 'next/server'
import { Response } from '@api/utils/Response'
import { z } from 'zod'
import { getUserId } from '@api/utils/getUserId'
import { StudyplanSchema } from '@/lib/schemas/Studyplan'
import { modifyStudyplansLists } from '@/app/api/utils/modifyStudyplansLists'

// Save or un-save an existing studyplan
export const PATCH = async (req: NextRequest) => {
  const supabase = createServerComponentClient({ cookies })
  let studyplanId: string
  let saveStudyplan: boolean

  // Check if user is authenticated
  const userId = await getUserId({ supabase })
  if (userId === null) return Response(false, 401, { msg: 'Unauthorized' })

  // Parse the request body
  try {
    const reqBody = await req.json()
    const { id, save } = z
      .object({
        id: z.string().uuid(),
        save: z.boolean()
      })
      .parse(reqBody)

    studyplanId = id
    saveStudyplan = save
  } catch {
    return Response(false, 400, { msg: 'Invalid request body' })
  }

  try {
    let wasSavedOrNot: boolean

    // Save studyplan
    if (saveStudyplan) {
      wasSavedOrNot = await modifyStudyplansLists({
        supabase,
        userId,
        key: 'saved',
        modifyId: studyplanId
      }).add()

      // Un-save studyplan
    } else {
      wasSavedOrNot = await modifyStudyplansLists({
        supabase,
        userId,
        key: 'saved',
        modifyId: studyplanId
      }).remove()
    }

    if (!wasSavedOrNot) {
      const prefix = saveStudyplan ? '' : 'un-'
      return Response(false, 400, { msg: `Nothing happened, studyplan was already ${prefix}saved` })
    }
    return Response(true, 200)
  } catch {
    return Response(false, 500)
  }
}

// Publish a studyplan and save it
export const POST = async (req: NextRequest) => {
  const supabase = createServerComponentClient({ cookies })
  let studyplanFromReq: StudyplanUnSaved

  // Check if user is authenticated
  const userId = await getUserId({ supabase })
  if (userId === null) return Response(false, 401, { msg: 'Unauthorized' })

  // Parse the request body
  try {
    const reqBody = await req.json()
    studyplanFromReq = await StudyplanSchema.parseAsync(reqBody)
  } catch {
    return Response(false, 400, { msg: 'Invalid request body' })
  }

  // Publish studyplan and save it
  try {
    const [publishedStudyplan] = await databaseQuery<StudyplanSaved[]>(
      supabase.from('studyplans').insert(studyplanFromReq).select()
    )
    const { id } = publishedStudyplan

    // Add studyplan to saved list
    await modifyStudyplansLists({
      supabase,
      userId,
      key: 'saved',
      modifyId: id
    }).add()

    return Response(true, 200, { data: id })
  } catch {
    return Response(false, 500)
  }
}
