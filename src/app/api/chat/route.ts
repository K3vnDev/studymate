import { MAX_MESSAGES_ON_PROMPT } from '@/consts'
import { ChatMessageSchema } from '@/lib/schemas/ChatMessage'
import { MateResponseSchema } from '@/lib/schemas/MateResponse'
import { messagesParser } from '@/lib/utils/messagesParser'
import type { MessageAssistantData } from '@/types.d'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import type { NextRequest } from 'next/server'
import OpenAI from 'openai'
import { zodResponseFormat } from 'openai/helpers/zod.mjs'
import type { ChatCompletionMessageParam } from 'openai/src/resources/index.js'
import { z } from 'zod'
import { getPrevChatMessages } from '../getPrevChatMessages'
import { Response } from '../response'
import { saveChatMessagesToDatabase } from '../saveChatMessagesToDabatase'
import { MATE_TRAIN_MESSAGE } from './mateTrainMessage'

// Get all previous chat messages
export const GET = async () => {
  try {
    const messages = await getPrevChatMessages()
    return Response(true, 200, { data: messages })
  } catch {
    return Response(false, 500)
  }
}

// Send a message to mate and get a response
export const POST = async (req: NextRequest) => {
  const openai = new OpenAI()
  openai.apiKey = process.env.OPENAI_API_KEY ?? ''

  let chatMessages: ChatCompletionMessageParam[] = []
  let userMessage = ''

  const supabase = createServerComponentClient({ cookies })
  const user = await supabase.auth.getUser()

  // Check if user is logged in
  if (user.data.user === null) {
    return Response(false, 401)
  }
  const { id } = user.data.user

  try {
    // Extract user message
    const { prevMessages, newMessage }: MessageAssistantData = await req.json()
    if (!prevMessages || !newMessage || typeof newMessage !== 'string') return Response(false, 400)

    userMessage = newMessage.trim()
    if (userMessage === '') return Response(false, 400)

    const validatedMessages = z.array(ChatMessageSchema).parse(prevMessages)
    const parsedMessages = messagesParser.clientToPrompt(validatedMessages)
    chatMessages = parsedMessages as ChatCompletionMessageParam[]
  } catch {
    return Response(false, 400, { msg: 'Invalid messages format' })
  }

  try {
    // Make send prompt to the AI
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
    const assistantMessages = completion.choices[0].message.parsed
    if (!assistantMessages) return Response(false, 500)

    // Save messages to database
    saveChatMessagesToDatabase({ assistantMessages, userMessage, userId: id })

    return Response(true, 201, { data: assistantMessages })
  } catch {
    return Response(false, 500)
  }
}
