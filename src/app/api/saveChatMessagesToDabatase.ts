import type { MateResponseSchema } from '@/types.d'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { getPrevChatMessages } from './getPrevChatMessages'

interface Params {
  userMessage: string
  assistantMessages: MateResponseSchema
  userId: string
}

export const saveChatMessagesToDatabase = async ({
  userMessage,
  assistantMessages,
  userId
}: Params) => {
  try {
    const prevChatMessages = await getPrevChatMessages()

    const messagesToInsert = [
      ...prevChatMessages,
      { role: 'user', content: userMessage },
      ...assistantMessages.responses.map(({ type, data }) => {
        return type === 'message'
          ? { role: 'assistant', content: data }
          : { role: 'system', content: JSON.stringify(data) }
      })
    ]

    await createServerComponentClient({ cookies })
      .from('users')
      .update([{ chat_with_mate: messagesToInsert }])
      .eq('id', userId)
  } catch {}
}
