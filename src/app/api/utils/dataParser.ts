import { MATE_VALUES } from '@consts'
import type {
  ChatMessage,
  ChatStudyplan,
  DBChatWithMate,
  DBCurrentStudyplanDay,
  DBUserStudyplanAndCurrentDayResponse,
  MateResponseSchema,
  PromptRequestSchema
} from '@types'
import type { ChatCompletionMessage } from 'openai/resources/index.mjs'

export const dataParser = {
  fromDBResponseToUserStudyplan: (response: DBUserStudyplanAndCurrentDayResponse[]) => {
    const {
      studyplan: fetchedStudyplan,
      current_studyplan_day: { day }
    } = response[0]

    return { ...fetchedStudyplan, current_day: day }
  },

  fromModelResponseToClientMessages: (responses: MateResponseSchema['responses']): ChatMessage[] =>
    responses.map(({ type, data }) => {
      if (type === 'message') {
        return { role: 'assistant', content: data }
      }
      // Remove extra daily lessons and set the original_id to null
      const slicedDailyLessons = data.daily_lessons.slice(0, MATE_VALUES.STUDYPLAN.MAX_DAYS)
      const content: ChatStudyplan = { ...data, original_id: null, daily_lessons: slicedDailyLessons }
      return { role: 'studyplan', content }
    }),

  fromClientMessagesToModelPrompt: (messages: PromptRequestSchema['messages']['previous']) =>
    messages.map(({ role, content }) =>
      role !== 'studyplan'
        ? { role, content }
        : { role: 'system', content: `Mate sent the following studyplan: " ${JSON.stringify(content)} "` }
    ) as ChatCompletionMessage[],

  fromNumberToCurrentStudyplanDay: (day: number): DBCurrentStudyplanDay => {
    const today = new Date()
    const last_updated = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`

    return { day, last_updated }
  },

  fromStudyplansInClientMessages: (messages: ChatMessage[] | DBChatWithMate[]) => {
    const parse = (action: typeof JSON.parse | typeof JSON.stringify) =>
      messages.map(msg => {
        if (msg.role === 'studyplan') {
          return { ...msg, content: action(msg.content as any) }
        }
        return msg
      })
    return {
      toStringified: () => parse(JSON.stringify),
      toObject: () => parse(JSON.parse)
    }
  }
}
