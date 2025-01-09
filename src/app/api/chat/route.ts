import { dataParser } from '@/app/api/utils/dataParser'
import { PromptRequestSchema } from '@/lib/schemas/PromptRequest'
import type { PromptRequestSchema as PromptRequestSchemaType } from '@/types.d'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import type { NextRequest } from 'next/server'
import type { ChatCompletionMessageParam } from 'openai/src/resources/index.js'
import { Response } from '../utils/Response'
import { getPrevChatMessages } from '../utils/getPrevChatMessages'
import { getUserId } from '../utils/getUserId'
import { promptAIModel } from '../utils/promptAIModel'
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
  const supabase = createServerComponentClient({ cookies })

  // Check if user is logged in
  const userId = await getUserId({ supabase })
  if (userId === null) return Response(false, 401)

  let chatMessages: ChatCompletionMessageParam[]
  let userMessage: string
  let userData: PromptRequestSchemaType['user_data']

  try {
    // Extract user message
    const reqBody = await req.json()
    const { messages, user_data } = await PromptRequestSchema.parseAsync(reqBody)

    const { new: newMessage, previous: previousChatMessages } = messages

    // Extract new user message and previous messages
    userMessage = newMessage
    chatMessages = dataParser.fromClientMessagesToModelPrompt(previousChatMessages)

    // Extract user data
    userData = user_data
  } catch {
    return Response(false, 400, { msg: 'Messages or user data are missing or invalid' })
  }

  try {
    // Send prompt to the AI Model
    const assistantResponses = await promptAIModel(
      { userData, prevMessages: chatMessages },
      { role: 'user', content: userMessage }
    )
    const assistantMessages = dataParser.fromModelResponseToClientMessages(assistantResponses)

    // Save messages to database
    saveChatMessagesToDatabase({ supabase, assistantMessages, userMessage, userId })

    return Response(true, 201, { data: assistantMessages })
  } catch {
    return Response(false, 500)
  }
}
