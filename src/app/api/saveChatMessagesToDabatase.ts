import type { MateResponse } from '@/lib/schemas/MateResponse'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { getPrevChatMessages } from './getPrevChatMessages'

interface Params {
  userMessage: string
  assistantMessages: MateResponse
}

export const saveChatMessagesToDatabase = async ({ userMessage, assistantMessages }: Params) => {
  try {
    const prevChatMessages = await getPrevChatMessages()
    const filteredMessages = assistantMessages.responses.filter(({ type }) => type === 'message')

    const messagesToInsert = [
      ...prevChatMessages,
      { role: 'user', content: userMessage },
      ...filteredMessages.map(({ data }) => ({ role: 'assistant', content: data }))
    ]

    const supabase = createServerComponentClient({ cookies })

    await supabase
      .from('users')
      .update([{ chat_with_mate: messagesToInsert }])
      .eq('id', (await supabase.auth.getUser()).data.user?.id)
  } catch {}
}
