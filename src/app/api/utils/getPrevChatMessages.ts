import type { PromptRequestSchema } from '@/types.d'
import type { SupabaseClient } from '@supabase/auth-helpers-nextjs'
import { dataParser } from './dataParser'
import { databaseQuery } from './databaseQuery'

interface Params {
  supabase: SupabaseClient
}

export const getPrevChatMessages = async ({ supabase }: Params) => {
  try {
    type QueryType = { chat_with_mate: PromptRequestSchema['messages']['previous'] }
    const data = await databaseQuery<QueryType[]>(supabase.from('users').select('chat_with_mate'))

    if (data.length === 0) return null
    const [{ chat_with_mate }] = data

    if (chat_with_mate === null) return []

    const parsedMessages = dataParser.fromStudyplanToAnother(chat_with_mate, JSON.parse)
    return parsedMessages
  } catch (ErrorTrace) {
    throw new Error()
  }
}
