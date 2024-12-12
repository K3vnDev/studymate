import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

export const getChatMessages = async () =>
  new Promise<any>((res, rej) => {
    const supabase = createServerComponentClient({ cookies })

    supabase
      .from('users')
      .select('chat_with_mate')

      .then(({ data, error }) => {
        error === null ? res(data as any) : rej()
      })
  })
