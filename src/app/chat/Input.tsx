import { ChatContext } from '@/lib/context/ChatContext'
import { dispatchEvent } from '@/lib/utils/dispatchEvent'
import { useChatStore } from '@/store/useChatStore'
import { GradientBorder } from '@components/GradientBorder'
import { EVENTS } from '@consts'
import { ChevronIcon } from '@icons'
import { useContext, useEffect, useRef } from 'react'

export const Input = () => {
  const highlightedMessage = useChatStore(s => s.highlightedMessage)
  const setHighlihtedMessage = useChatStore(s => s.setHighlihtedMessage)
  const setUserInput = useChatStore(s => s.setUserInput)
  const messages = useChatStore(s => s.messages)

  const { handleSubmit, inputProps, isWaitingResponse } = useContext(ChatContext)
  const inputRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    if (highlightedMessage !== null) {
      if (highlightedMessage !== '') {
        setUserInput(highlightedMessage)
      }
      focusInput()
      dispatchEvent(EVENTS.ON_HIGHLIGHT_BORDER)
      setHighlihtedMessage(null)
    }
  }, [highlightedMessage])

  useEffect(() => {
    focusInput()
    return () => setHighlihtedMessage(null)
  }, [])

  const focusInput = () => {
    if (!inputRef.current) return

    inputRef.current.focus()
    const { length } = inputRef.current.value
    inputRef.current.setSelectionRange(length, length)
  }

  const yPosition = messages?.length ? 'bottom-5' : 'bottom-1/2 translate-y-[calc(100%+.75rem)]'

  return (
    <GradientBorder
      color='skySalmon'
      className={{
        main: `absolute ${yPosition} left-1/2 -translate-x-1/2 w-[calc(100%-23.5rem)] p-1 rounded-[1.625rem]`
      }}
      bouncy
    >
      <form
        className={`
          bg-gray-50 border border-gray-20 rounded-3xl flex px-4 justify-between gap-4 items-center 
          focus-within:border-[#aaa] [transition:all_.2s_ease] hover:brightness-110
        `}
        onSubmit={handleSubmit}
      >
        <textarea
          className={`
            min-h-12 py-3 w-full max-w-full placeholder:text-[#363636] bg-transparent 
            outline-none text-gray-10 resize-none [field-sizing:content] peer placeholder:select-none
          `}
          placeholder='Message Mate'
          ref={inputRef}
          {...inputProps}
          autoFocus
        />
        <button
          className='bg-gray-20 rounded-full size-9 min-w-9 flex justify-center items-center button group'
          disabled={isWaitingResponse}
        >
          <ChevronIcon className='text-gray-50 stroke-[2.5px] transition group-active:-translate-y-1' />
        </button>
      </form>
    </GradientBorder>
  )
}
