import { dataParser } from '@/app/api/utils/dataParser'
import { MATE_VALUES, MAX_MESSAGES_ON_PROMPT } from '@/consts'
import { ChatMessageSchema, MessageContentSchema } from '@/lib/schemas/ChatMessage'
import { MateResponseSchema } from '@/lib/schemas/MateResponse'
import type { MessageAssistantData } from '@/types.d'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import type { NextRequest } from 'next/server'
import OpenAI from 'openai'
import { zodResponseFormat } from 'openai/helpers/zod.mjs'
import type { ChatCompletionMessageParam } from 'openai/src/resources/index.js'
import { z } from 'zod'
import { Response } from '../utils/Response'
import { getPrevChatMessages } from '../utils/getPrevChatMessages'
import { getUserId } from '../utils/getUserId'
import { MATE_TRAIN_MESSAGE } from '../utils/mateTrainMessage'
import { saveChatMessagesToDatabase } from '../utils/saveChatMessagesToDabatase'

// Get all previous chat messages
export const GET = async () => {
  try {
    const supabase = createServerComponentClient({ cookies })

    const prevChatMessages = await getPrevChatMessages({ supabase })
    if (prevChatMessages === null) return Response(false, 401)

    return Response(true, 200, { data: prevChatMessages })
  } catch {
    return Response(false, 500)
  }
}

// Send a message to mate and get a response
export const POST = async (req: NextRequest) => {
  const openai = new OpenAI()
  openai.apiKey = process.env.OPENAI_API_KEY ?? ''

  let chatMessages: ChatCompletionMessageParam[]
  let userMessage: string

  const supabase = createServerComponentClient({ cookies })

  // Check if user is logged in
  const userId = await getUserId({ supabase })
  if (userId === null) return Response(false, 401)

  try {
    // Extract user message
    const { prevMessages, newMessage }: MessageAssistantData = await req.json()

    userMessage = await MessageContentSchema.parseAsync(newMessage)
    const validatedMessages = await z.array(ChatMessageSchema).parseAsync(prevMessages)

    const parsedMessages = dataParser.clientToPrompt(validatedMessages)
    chatMessages = parsedMessages as ChatCompletionMessageParam[]
  } catch {
    return Response(false, 400, { msg: 'Messages are missing or invalid' })
  }

  try {
    // Send prompt to the AI Model
    const completion = await openai.beta.chat.completions.parse({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: MATE_TRAIN_MESSAGE },
        ...chatMessages.slice(-MAX_MESSAGES_ON_PROMPT),
        { role: 'user', content: userMessage }
      ],
      response_format: zodResponseFormat(MateResponseSchema, 'messages_and_studyplan')
    })

    // Extract response message
    const assistantResponse = completion.choices[0].message.parsed
    if (!assistantResponse) return Response(false, 500)

    // Remove extra daily lessons
    const assistantMessages = assistantResponse.responses.map(assistantMessage => {
      const { type, data } = assistantMessage
      if (type === 'message') return assistantMessage

      const slicedDailyLessons = data.daily_lessons.slice(0, MATE_VALUES.STUDYPLAN.MAX_DAYS)
      return { ...assistantMessage, data: { ...data, daily_lessons: slicedDailyLessons } }
    })

    // Save messages to database
    saveChatMessagesToDatabase({ supabase, assistantMessages, userMessage, userId })

    return Response(true, 201, { data: assistantMessages })
  } catch {
    return Response(false, 500)
  }
}
