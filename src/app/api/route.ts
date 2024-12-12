import { MATE_INITIAL_MESSAGE, MATE_TRAIN_MESSAGE } from '@/consts'
import type { ChatMessage } from '@/types.d'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { type NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'
import { getChatMessages } from './getChatMessages'

export const POST = async (req: NextRequest) => {
  const openai = new OpenAI()
  openai.apiKey = process.env.OPENAI_API_KEY ?? ''

  const supabase = createServerComponentClient({ cookies })

  try {
    // Extract user message
    const reqData = await req.json()
    const userMessage: string = reqData.message.trim()
    if (userMessage === '') return NextResponse.json({}, { status: 400 })

    // Get previous chat messages
    const chatMessages: ChatMessage[] | null = (await getChatMessages())[0].chat_with_mate

    // Make send prompt to the AI
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: MATE_TRAIN_MESSAGE },
        { role: 'assistant', content: MATE_INITIAL_MESSAGE },
        ...(chatMessages ?? []),
        { role: 'user', content: userMessage }
      ]
    })

    // Extract response message
    const assistantMessage = completion.choices[0].message.content
    if (!assistantMessage) return NextResponse.json({}, { status: 500 })

    // Save messages to database
    const messagesToInsert: ChatMessage[] = [
      { role: 'user', content: userMessage },
      { role: 'assistant', content: assistantMessage }
    ]
    const { error } = await supabase
      .from('users')
      .update([{ chat_with_mate: messagesToInsert }])
      .eq('id', (await supabase.auth.getUser()).data.user?.id)

    if (error !== null) NextResponse.json({}, { status: 500 })

    return NextResponse.json({ message: assistantMessage })
  } catch {
    return NextResponse.json({}, { status: 500 })
  }
}
