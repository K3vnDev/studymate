'use client'

import { ChatMessage } from '@/components/ChatMessage'
import { AppIcon, ArrowIcon, ChevronIcon, LoadingIcon } from '@/components/icons'
import { FONTS } from '@/consts'
import { useChatCustomScroll } from '@/hooks/useChatCustomScroll'
import { useChatMessages } from '@/hooks/useChatMessages'

export default function ChatPage() {
  const { chatMessages, handleSubmit, isWaitingResponse, inputProps } = useChatMessages()
  const { listRef, scrollRef, scrollDownButtonProps } = useChatCustomScroll({ isWaitingResponse })

  return (
    <>
      <main className='main items-center h-[calc(100vh-3rem)] flex-col justify-between fixed right-48 top-6 px-48'>
        <div
          className={`
            ${FONTS.POPPINS} flex gap-3 items-center text-white absolute top-8 left-1/2 -translate-x-1/2 h-14 
            backdrop-blur-lg rounded-full px-16 bg-black/35
          `}
        >
          <AppIcon className='size-8' />
          <h3 className='font-medium text-3xl'>MATE</h3>
        </div>

        {/* Messages section */}
        <ul className='w-full max-h-full flex flex-col gap-4 py-28 overflow-y-hidden' ref={listRef}>
          {chatMessages !== null ? (
            <>
              {chatMessages.map((chatMessage, i) => (
                <ChatMessage {...chatMessage} key={i} />
              ))}
              {isWaitingResponse && <ChatMessage role='bubbles' content='' />}
            </>
          ) : (
            <div className='absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2'>
              <LoadingIcon className='size-20 animate-spin text-white/25' />
            </div>
          )}
        </ul>

        {/* Input */}
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

        {/* Scroll down button */}
        <button
          className='transition absolute left-1/2 -translate-x-1/2 bottom-[5.5rem] rounded-full border border-[#555555] p-2 bg-[#131313] button'
          {...scrollDownButtonProps}
        >
          <ArrowIcon className='text-[#555555]' />
        </button>
      </main>

      {/* Scroll reference*/}
      <div className='w-8 bg-transparent pointer-events-none' ref={scrollRef} />
    </>
  )
}
