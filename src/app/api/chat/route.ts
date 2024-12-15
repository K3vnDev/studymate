import { MAX_CHAT_MESSAGES_PROMPT } from '@/consts'
import { ChatMessagesSchema } from '@/lib/schemas/ChatMessages'
import { MateResponseSchema } from '@/lib/schemas/MateResponse'
import type { ChatMessage, MessageAssistantData } from '@/types.d'
import type { NextRequest } from 'next/server'
import OpenAI from 'openai'
import { zodResponseFormat } from 'openai/helpers/zod.mjs'
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

  let chatMessages: ChatMessage[] = []
  let userMessage = ''

  try {
    // Extract user message
    const { prevMessages, newMessage }: MessageAssistantData = await req.json()
    if (!prevMessages || !newMessage || typeof newMessage !== 'string') return Response(false, 400)

    userMessage = newMessage.trim()
    if (userMessage === '') return Response(false, 400)

    chatMessages = ChatMessagesSchema.parse(prevMessages)
  } catch {
    return Response(false, 400, { msg: 'Invalid messages format' })
  }

  try {
    // Make send prompt to the AI
    const completion = await openai.beta.chat.completions.parse({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: MATE_TRAIN_MESSAGE },
        ...chatMessages.slice(-MAX_CHAT_MESSAGES_PROMPT),
        { role: 'user', content: userMessage }
      ],
      response_format: zodResponseFormat(MateResponseSchema, 'messages_and_studyplan')
    })

    // Extract response message
    const assistantMessages = completion.choices[0].message.parsed
    if (!assistantMessages) return Response(false, 500)

    // Save messages to database
    saveChatMessagesToDatabase({ assistantMessages, userMessage })

    return Response(true, 201, { data: assistantMessages })
  } catch (e) {
    console.log({ ErrorTrace: e })
    return Response(false, 500)
  }
}
