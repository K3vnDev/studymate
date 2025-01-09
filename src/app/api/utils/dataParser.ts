import { MATE_VALUES } from '@/consts'
import type {
  ChatMessage,
  DBCurrentStudyplanDay,
  DBUserStudyplanAndCurrentDayResponse,
  MateResponseSchema,
  PromptRequestSchema
} from '@/types.d'
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
      // Remove extra daily lessons (beware, this could be avoided on other ends)
      const slicedDailyLessons = data.daily_lessons.slice(0, MATE_VALUES.STUDYPLAN.MAX_DAYS)
      return { role: 'studyplan', content: { ...data, daily_lessons: slicedDailyLessons } }
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

  fromStudyplanToAnother: (messages: ChatMessage[], action: typeof JSON.parse | typeof JSON.stringify) =>
    messages.map(({ role, content }) =>
      role === 'studyplan' ? { role, content: action(content) } : { role, content }
    )
}
