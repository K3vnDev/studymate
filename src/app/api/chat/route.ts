import { dataParser } from '@/app/api/utils/dataParser'
import { getPrevChatMessages } from '@api/utils/getPrevChatMessages'
import { getUserId } from '@api/utils/getUserId'
import { promptAIModel } from '@api/utils/promptAIModel'
import { saveNewChatMessagesToDatabase } from '@/app/api/utils/saveNewChatMessagesToDabatase'
import { PromptRequestSchema } from '@schemas/PromptRequest'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import type { ChatMessage, PromptRequestSchema as PromptRequestSchemaType } from '@types'
import { cookies } from 'next/headers'
import type { NextRequest } from 'next/server'
import type { ChatCompletionMessageParam } from 'openai/src/resources/index.js'
import { USER_MAX_MESSAGE_LENGTH } from '@consts'
import { response } from '../utils/response'

// Get all previous chat messages
export const GET = async () => {
  try {
    const supabase = createServerComponentClient({ cookies })

    const prevChatMessages = await getPrevChatMessages({ supabase })
    if (prevChatMessages === null) return response(false, 401)

    return response(true, 200, { data: prevChatMessages })
  } catch {
    return response(false, 500)
  }
}

// Send a message to Mate and get a response
export const POST = async (req: NextRequest) => {
  const supabase = createServerComponentClient({ cookies })

  // Check if user is logged in
  const userId = await getUserId({ supabase })
  if (userId === null) return response(false, 401)

  let chatMessages: ChatCompletionMessageParam[]
  let userMessage: string
  let userData: PromptRequestSchemaType['user_data']

  try {
    // Extract user message
    const reqBody = await req.json()
    const { messages, user_data } = await PromptRequestSchema.parseAsync(reqBody)

    const { new: newMessage, previous: previousChatMessages } = messages

    // Check if user message is too long
    if (newMessage.length > USER_MAX_MESSAGE_LENGTH) {
      return response(false, 400, { msg: 'User message was too long' })
    }

    // Extract new user message and previous messages
    userMessage = newMessage
    const rawMessages = dataParser.fromClientMessagesToModelPrompt(previousChatMessages)
    chatMessages = rawMessages.filter(m => m.content && m.content.length <= USER_MAX_MESSAGE_LENGTH)

    // Extract user data
    userData = user_data
  } catch {
    return response(false, 400, { msg: 'Messages or user data are missing or invalid' })
  }

  try {
    // Send prompt to the AI Model
    const assistantResponses = await promptAIModel(
      { userData, prevMessages: chatMessages },
      { role: 'user', content: userMessage }
    )
    const assistantMessages = dataParser.fromModelResponseToClientMessages(assistantResponses)

    // Save messages to database
    saveNewChatMessagesToDatabase({ supabase, assistantMessages, userMessage, userId })

    return response(true, 201, { data: assistantMessages })
  } catch {
    return response(false, 500)
  }
}

// Save messages to database
export const PATCH = async (req: NextRequest) => {
  const supabase = createServerComponentClient({ cookies })

  // Check if user is logged in
  const userId = await getUserId({ supabase })
  if (userId === null) return response(false, 401)

  let chatMessages: ChatMessage[]

  try {
    const reqBody = await req.json()
    const parsedMessages = await PromptRequestSchema.shape.messages.shape.previous.parseAsync(reqBody)
    chatMessages = parsedMessages
  } catch {
    return response(false, 400, { msg: 'Messages are missing or invalid' })
  }

  try {
    const parsedMessages = dataParser.fromStudyplansInClientMessages(chatMessages).toStringified()

    await supabase
      .from('users')
      .update([{ chat_with_mate: parsedMessages }])
      .eq('id', userId)

    return response(true, 200)
  } catch {
    return response(false, 500)
  }
}
