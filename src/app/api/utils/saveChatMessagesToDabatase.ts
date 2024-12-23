import { dataParser } from '@/app/api/utils/dataParser'
import type { MateResponseSchema } from '@/types.d'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { getPrevChatMessages } from './getPrevChatMessages'

interface Params {
  userMessage: string
  assistantMessages: MateResponseSchema['responses']
  userId: string
}

export const saveChatMessagesToDatabase = async ({
  userMessage,
  assistantMessages,
  userId
}: Params) => {
  const prevChatMessages = await getPrevChatMessages()
  if (prevChatMessages === null) return

  const messagesToInsert = [
    ...prevChatMessages,
    { role: 'user', content: userMessage },
    ...dataParser.mateResponseToDB(assistantMessages)
  ]

  await createServerComponentClient({ cookies })
    .from('users')
    .update([{ chat_with_mate: messagesToInsert }])
    .eq('id', userId)
}
