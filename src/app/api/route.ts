import { type NextRequest, NextResponse } from 'next/server'

import OpenAI from 'openai'

export const POST = async (req: NextRequest) => {
  const openai = new OpenAI()
  openai.apiKey = process.env.OPENAI_API_KEY ?? ''

  try {
    const data = await req.json()
    const content: string = data.message.trim()
    if (content === '') return NextResponse.json({}, { status: 400 })

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: 'You are a helpful assistant.' },
        {
          role: 'user',
          content
        }
      ]
    })
    const message = completion.choices[0].message.content
    return NextResponse.json({ message })
  } catch {
    return NextResponse.json({}, { status: 500 })
  }
}
