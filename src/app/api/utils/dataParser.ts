import type {
  ChatMessageSchema,
  MateResponseSchema,
  UserStudyplanAndCurrentDayResponse
} from '@/types.d'

export const dataParser = {
  clientToPrompt: (messages: ChatMessageSchema[]) =>
    messages.map(msg =>
      msg.role === 'studyplan' ? { role: 'system', content: JSON.stringify(msg.content) } : msg
    ),

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
