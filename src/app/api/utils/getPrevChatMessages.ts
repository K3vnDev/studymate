import type { ChatMessageSchema } from '@/types'
import type { SupabaseClient } from '@supabase/auth-helpers-nextjs'
import { databaseQuery } from './databaseQuery'

interface Params {
  supabase: SupabaseClient
}

export const getPrevChatMessages = async ({ supabase }: Params) => {
  try {
    type QueryType = { chat_with_mate: ChatMessageSchema[] }
    const data = await databaseQuery<QueryType[]>(supabase.from('users').select('chat_with_mate'))

    if (data.length === 0) return null
    const [{ chat_with_mate }] = data

    if (chat_with_mate === null) return []
    return chat_with_mate
  } catch {
    throw new Error()
  }
}
