import type { ChatMessageSchema } from '@/types'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

export const getPrevChatMessages = async () =>
  new Promise<ChatMessageSchema[]>((res, rej) => {
    const supabase = createServerComponentClient({ cookies })

    supabase
      .from('users')
      .select('chat_with_mate')

      .then(({ data, error }) => {
        try {
          if (error !== null) return rej()

          const prevMessages = data[0].chat_with_mate
          if (data === null || prevMessages === null) return res([])

          res(prevMessages)
        } catch (err) {
          rej(err)
        }
      })
  })
