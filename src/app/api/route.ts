import { MATE_TRAIN_MESSAGE } from '@/consts'
import { MessagesSchema } from '@/schemas/Messages'
import type { ChatMessage, MessageAssistantData } from '@/types.d'
import type { NextRequest } from 'next/server'
import OpenAI from 'openai'
import { Response } from './response'
import { saveChatMessagesToDatabase } from './saveChatMessagesToDabatase'

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

    chatMessages = MessagesSchema.parse(prevMessages)

    console.log({ messagesRecievedFromClient: chatMessages })
  } catch {
    return Response(false, 400)
  }

  try {
    // Make send prompt to the AI
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: MATE_TRAIN_MESSAGE },
        ...chatMessages,
        { role: 'user', content: userMessage }
      ]
    })

    // Extract response message
    const assistantMessage = completion.choices[0].message.content
    if (!assistantMessage) return Response(false, 500)

    // Save messages to database
    saveChatMessagesToDatabase({ assistantMessage, userMessage })

    return Response(true, 200, { data: assistantMessage })
  } catch {
    return Response(false, 500)
  }
}
