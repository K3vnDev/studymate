import { MAX_CHAT_MESSAGES_DB } from '@/consts'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { getPrevChatMessages } from './getPrevChatMessages'

interface Params {
  userMessage: string
  assistantMessage: string
}

export const saveChatMessagesToDatabase = async ({ userMessage, assistantMessage }: Params) => {
  try {
    const prevChatMessages = await getPrevChatMessages()

    if (prevChatMessages.length >= MAX_CHAT_MESSAGES_DB) {
      prevChatMessages.slice(2 - MAX_CHAT_MESSAGES_DB)
    }

    const messagesToInsert = [
      ...prevChatMessages,
      { role: 'user', content: userMessage },
      { role: 'assistant', content: assistantMessage }
    ]

    const supabase = createServerComponentClient({ cookies })

    await supabase
      .from('users')
      .update([{ chat_with_mate: messagesToInsert }])
      .eq('id', (await supabase.auth.getUser()).data.user?.id)
  } catch (err) {
    console.log('ErrorTrace', { err })
  }
}
