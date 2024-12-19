import { Response } from '@api/response'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

// Get user studyplan
export const GET = async () => {
  const supabase = createServerComponentClient({ cookies })

  const { data, error } = await supabase.from('users').select('studyplan')
  if (error !== null || data === null) return Response(false, 500)

  if (data.length === 0) return Response(false, 401)

  const [{ studyplan }] = data
  return Response(true, 200, { data: studyplan })
}
