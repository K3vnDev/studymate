'use client'

import { ChatMessage } from '@/components/ChatMessage'
import { AppIcon, ChevronIcon } from '@/components/icons'
import { FONTS } from '@/consts'
import { useChat } from '@/hooks/useChat'

export default function Chat() {
  const { chatMessages, handleSubmit, inputProps } = useChat()

  return (
    <main className='main items-center max-h-[calc(100vh-3rem)] flex-col justify-between fixed right-48 top-6 px-48'>
      <h3
        className={`${FONTS.POPPINS} flex gap-3 items-center text-white font-medium text-3xl absolute top-8 left-48`}
      >
        <AppIcon className='size-8' />
        MATE
      </h3>

      <ul className='w-full max-h-full flex flex-col gap-4 py-28 overflow-y-hidden'>
        {chatMessages.map((chatMessage, i) => (
          <ChatMessage {...chatMessage} key={i} />
        ))}
      </ul>

      <form
        className={`
          bg-[#1C1B20] border border-[#555] rounded-3xl flex px-4 justify-between 
          items-center gap-4 absolute bottom-5 left-1/2 -translate-x-1/2 w-[calc(100%-24rem)]
        `}
        onSubmit={handleSubmit}
      >
        <textarea
          className={`
            min-h-12 py-3 w-full max-w-full placeholder:text-[#363636] bg-transparent 
            outline-none text-[#ccc] resize-none [field-sizing:content]
          `}
          placeholder='Message Mate'
          {...inputProps}
        />
        <button className='bg-[#555] rounded-full size-9 min-w-9 flex justify-center items-center button group'>
          <ChevronIcon className='text-[#1C1B20] stroke-[2.5px] transition group-active:-translate-y-1' />
        </button>
      </form>
    </main>
  )
}
