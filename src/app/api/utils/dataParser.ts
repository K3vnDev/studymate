import type { ChatMessageSchema, MateResponseSchema, UserStudyplanAndCurrentDayResponse } from '@/types.d'

export const dataParser = {
  clientToPrompt: (messages: ChatMessageSchema[]) =>
    messages.map(msg => {
      if (msg.role !== 'studyplan') return msg

      const content = `Mate sent the following studyplan: ${JSON.stringify(msg.content)}`
      return { role: 'system', content }
    }),

  mateResponseToDB: (messages: MateResponseSchema['responses']) =>
    messages.map(({ type, data }) =>
      type === 'message'
        ? { role: 'assistant', content: data }
        : { role: 'system', content: JSON.stringify(data) }
    ),

  DBResponseToUserStudyplan: (response: UserStudyplanAndCurrentDayResponse[]) => {
    const {
      studyplan: fetchedStudyplan,
      current_studyplan_day: { day }
    } = response[0]

    return { ...fetchedStudyplan, current_day: day }
  }
}
