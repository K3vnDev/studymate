import { dataParser } from '@/app/api/utils/dataParser'
import type { MateResponseSchema } from '@/types.d'
import type { SupabaseClient } from '@supabase/auth-helpers-nextjs'
import { getPrevChatMessages } from './getPrevChatMessages'

interface Params {
  userMessage: string
  assistantMessages: MateResponseSchema['responses']
  userId: string
  supabase: SupabaseClient
}

export const saveChatMessagesToDatabase = async ({
  userMessage,
  assistantMessages,
  userId,
  supabase
}: Params) => {
  try {
    const prevChatMessages = await getPrevChatMessages({ supabase })
    if (prevChatMessages === null) return

    const messagesToInsert = [
      ...prevChatMessages,
      { role: 'user', content: userMessage },
      ...dataParser.mateResponseToDB(assistantMessages)
    ]

    await supabase
      .from('users')
      .update([{ chat_with_mate: messagesToInsert }])
      .eq('id', userId)

    return
  } catch {
    throw new Error()
  }
}
