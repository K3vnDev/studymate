import type { ChatMessage } from '@types'
import { dataFetch } from './dataFetch'
import { CONTENT_JSON } from '@/consts'

export const saveChatToDatabase = (chatMessages: ChatMessage[] | null) => {
  if (!chatMessages) return

  dataFetch({
    url: '/api/chat',
    options: {
      method: 'PATCH',
      headers: CONTENT_JSON,
      body: JSON.stringify(chatMessages)
    }
  })
}
