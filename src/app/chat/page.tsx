'use client'

import { ChatMessage } from '@/components/ChatMessage'
import { AppIcon, ChevronIcon } from '@/components/icons'
import { CONTENT_JSON, FONTS } from '@/consts'
import { useChatsStore } from '@/store/useChatsStore'
import { dataFetch } from '@/utils/dataFetch'
import { useState } from 'react'

export default function Chat() {
  const [userMessage, setUserMessage] = useState('')
  const chatMessages = useChatsStore(s => s.chatMessages)
  const pushChatMessage = useChatsStore(s => s.pushChatMessage)

  const messageMate = async (message: string) => {
    dataFetch<string>({
      url: '/api',
      options: {
        headers: CONTENT_JSON,
        method: 'POST',
        body: JSON.stringify({
          prevMessages: chatMessages,
          newMessage: message
        })
      },
      onSuccess: data => {
        pushChatMessage({ role: 'assistant', content: data })
      }
    })
  }

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setUserMessage(e.target.value)
  }

  const handleSubmit = (e?: React.FormEvent<HTMLFormElement>) => {
    e?.preventDefault()

    const trimmedMessage = userMessage.trim()
    if (trimmedMessage === '') return

    pushChatMessage({ role: 'user', content: trimmedMessage })
    messageMate(trimmedMessage)
    setUserMessage('')
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
            value={userMessage}
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
