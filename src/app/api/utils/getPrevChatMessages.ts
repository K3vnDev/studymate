import type { ChatMessageSchema } from '@/types'
import type { SupabaseClient } from '@supabase/auth-helpers-nextjs'
import { databaseQuery } from './databaseQuery'

interface Params {
  supabase: SupabaseClient
}

export const getPrevChatMessages = async ({ supabase }: Params) => {
  try {
    const data = await databaseQuery<{ chat_with_mate: ChatMessageSchema[] }[]>(
      supabase.from('users').select('chat_with_mate')
    )
    if (!data.length) return null
    const [{ chat_with_mate }] = data

    if (chat_with_mate === null) return []
    return chat_with_mate
  } catch {
    return null
  }
}
