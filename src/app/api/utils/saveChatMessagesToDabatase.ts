import type { ChatMessage } from '@/types.d'
import type { SupabaseClient } from '@supabase/auth-helpers-nextjs'
import { dataParser } from './dataParser'
import { getPrevChatMessages } from './getPrevChatMessages'

interface Params {
  userMessage: string
  assistantMessages: ChatMessage[]
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

    // biome-ignore format: <>
    const stringifiedAssistantMessages = dataParser
      .fromStudyplanToAnother(assistantMessages, JSON.stringify)

    const messagesToInsert = [
      ...prevChatMessages,
      { role: 'user', content: userMessage },
      ...stringifiedAssistantMessages
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
