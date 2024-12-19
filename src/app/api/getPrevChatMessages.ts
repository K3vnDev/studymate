import type { ChatMessageSchema } from '@/types'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

export const getPrevChatMessages = async () => {
  try {
    const { data, error } = await createServerComponentClient({ cookies })
      .from('users')
      .select('chat_with_mate')

    if (error !== null) return null
    const { chat_with_mate } = data[0]

    if (chat_with_mate === null || data === null) return []
    return chat_with_mate as ChatMessageSchema[]
  } catch {
    return null
  }
}
