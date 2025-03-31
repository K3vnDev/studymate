import { dataParser } from '@api/utils/dataParser'
import { databaseQuery } from '@api/utils/databaseQuery'
import type { SupabaseClient } from '@supabase/auth-helpers-nextjs'
import type { DBChatWithMate } from '@types'

interface Params {
  supabase: SupabaseClient
}

type QueryType = {
  chat_with_mate: DBChatWithMate[]
}

export const getPrevChatMessages = async ({ supabase }: Params) => {
  try {
    const data = await databaseQuery<QueryType[]>(supabase.from('users').select('chat_with_mate'))

    if (data.length === 0) return null
    const [{ chat_with_mate }] = data

    if (chat_with_mate === null) return []

    const parsedMessages = dataParser.fromStudyplansInClientMessages(chat_with_mate).toObject()
    return parsedMessages
  } catch {
    throw new Error()
  }
}
