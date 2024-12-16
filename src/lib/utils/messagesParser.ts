import type { ChatMessageSchema, MateResponseSchema } from '@/types.d'

export const messagesParser = {
  clientToPrompt: (messages: ChatMessageSchema[]) =>
    messages.map(msg =>
      msg.role === 'studyplan' ? { role: 'system', content: JSON.stringify(msg.content) } : msg
    ),

  mateResponseToDB: (messages: MateResponseSchema['responses']) =>
    messages.map(({ type, data }) =>
      type === 'message'
        ? { role: 'assistant', content: data }
        : { role: 'system', content: JSON.stringify(data) }
    )
}
