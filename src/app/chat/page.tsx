'use client'

import { ChatMessage } from '@/components/ChatMessage'
import { AppIcon, ChevronIcon } from '@/components/icons'
import { FONTS } from '@/consts'
import { useChatsStore } from '@/store/useChatsStore'
import { useState } from 'react'

export default function Chat() {
  const [message, setMessage] = useState('')
  const chatMessages = useChatsStore(s => s.chatMessages)
  const pushChatMessage = useChatsStore(s => s.pushChatMessage)

  const messageMate = async (message: string) => {
    const res = await fetch('/api', {
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify({ message })
    })

    const data = await res.json()
    pushChatMessage({
      role: 'assistant',
      content: data.message
    })
  }

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value)
  }

  const handleSubmit = (e?: React.FormEvent<HTMLFormElement>) => {
    e ? e.preventDefault() : 0

    const trimmedMessage = message.trim()
    if (trimmedMessage === '') return

    pushChatMessage({ role: 'user', content: trimmedMessage })
    messageMate(trimmedMessage)
    setMessage('')
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit()
    }
  }

  return (
    <main className='main items-center'>
      <div className='flex flex-col justify-between h-full w-[42rem]'>
        <h3 className={`${FONTS.POPPINS} flex gap-3 items-center text-white font-medium text-3xl`}>
          <AppIcon className='size-8' />
          MATE
        </h3>

        <ul className='w-full h-full flex flex-col gap-4 mt-6'>
          {chatMessages.map((chatMessage, i) => (
            <ChatMessage {...chatMessage} key={i} />
          ))}
        </ul>

        <form
          className='bg-[#1C1B20] border border-[#555] rounded-3xl flex px-4 justify-between items-center gap-4 w-full max-w-full self-center'
          onSubmit={handleSubmit}
        >
          <textarea
            className='min-h-12 py-3 w-full max-w-full placeholder:text-[#363636] bg-transparent outline-none text-[#ccc] resize-none [field-sizing:content]'
            placeholder='Message Mate'
            value={message}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
          />
          <button className='bg-[#555] rounded-full size-9 min-w-9 flex justify-center items-center button group'>
            <ChevronIcon className='text-[#1C1B20] stroke-[2.5px] transition group-active:-translate-y-1' />
          </button>
        </form>
      </div>
    </main>
  )
}
