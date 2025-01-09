import { MAX_MESSAGES_ON_PROMPT } from '@/consts'
import { MateResponseSchema } from '@/lib/schemas/MateResponse'
import type { PromptRequestSchema as PromptRequestSchemaType } from '@/types.d'
import OpenAI from 'openai'
import { zodResponseFormat } from 'openai/helpers/zod.mjs'
import type { ChatCompletionMessageParam } from 'openai/resources/index.mjs'
import { MATE_TRAIN_MESSAGE } from './mateTrainMessage'

interface Data {
  userData?: PromptRequestSchemaType['user_data']
  prevMessages: ChatCompletionMessageParam[]
}

export const promptAIModel = async (
  { userData, prevMessages }: Data,
  ...newMessages: ChatCompletionMessageParam[]
) => {
  const openai = new OpenAI()
  openai.apiKey = process.env.OPENAI_API_KEY ?? ''

  const previousMessages = prevMessages.slice(-MAX_MESSAGES_ON_PROMPT)

  const trainingMessages: ChatCompletionMessageParam[] = [{ role: 'system', content: MATE_TRAIN_MESSAGE }]

  if (userData) {
    trainingMessages.push({ role: 'system', content: JSON.stringify({ user_data: userData }) })
  }

  const completion = await openai.beta.chat.completions.parse({
    model: 'gpt-4o-mini',
    messages: [
      ...trainingMessages,

      ...previousMessages,
      ...newMessages
    ],
    response_format: zodResponseFormat(MateResponseSchema, 'messages_and_studyplan')
  })

  const { parsed } = completion.choices[0].message
  if (parsed === null) throw new Error()

  return parsed.responses
}
