import { ChevronIcon } from '@/components/icons'
import { ChatContext } from '@/lib/context/ChatContext'
import { useChatStore } from '@/store/useChatStore'
import { useContext, useEffect, useRef } from 'react'

export const Input = () => {
  const highlightedMessage = useChatStore(s => s.highlightedMessage)
  const setHighlihtedMessage = useChatStore(s => s.setHighlihtedMessage)
  const setUserInput = useChatStore(s => s.setUserInput)
  const messages = useChatStore(s => s.messages)

  const { handleSubmit, inputProps } = useContext(ChatContext)
  const timeoutRef = useRef<NodeJS.Timeout>()
  const inputRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    if (highlightedMessage !== null) {
      if (highlightedMessage !== '') setUserInput(highlightedMessage)

      clearTimeout(timeoutRef.current)
      timeoutRef.current = setTimeout(() => {
        setHighlihtedMessage(null)
      }, 2000)

      if (inputRef.current) {
        inputRef.current.focus()
        const { length } = inputRef.current.value
        inputRef.current.setSelectionRange(length, length)
      }
    }
    return () => clearTimeout(timeoutRef.current)
  }, [highlightedMessage])

  useEffect(() => () => setHighlihtedMessage(null), [])

  const [gradientBorderOpacity, formBorder, pounceAnimation] =
    highlightedMessage === null
      ? ['opacity-0', 'border', 'animate-none']
      : ['opacity-100', 'border-none', 'animate-pounce-once']

  const yPosition = messages?.length ? 'bottom-5' : 'bottom-1/2 translate-y-[calc(100%+.75rem)]'

  return (
    <div
      className={`
        absolute ${yPosition} left-1/2 -translate-x-1/2 w-[calc(100%-23.5rem)] 
        p-1 rounded-full overflow-hidden ${pounceAnimation}
      `}
    >
      <form
        className={`
          bg-gray-50 ${formBorder} border-gray-20 rounded-3xl flex px-4 justify-between gap-4 items-center 
          focus-within:border-[#aaa] [transition:all_.2s_ease] hover:brightness-110
        `}
        onSubmit={handleSubmit}
      >
        <textarea
          className={`
          min-h-12 py-3 w-full max-w-full placeholder:text-[#363636] bg-transparent 
          outline-none text-gray-10 resize-none [field-sizing:content]
          `}
          placeholder='Message Mate'
          ref={inputRef}
          {...inputProps}
          autoFocus
        />
        <button className='bg-gray-20 rounded-full size-9 min-w-9 flex justify-center items-center button group'>
          <ChevronIcon className='text-gray-50 stroke-[2.5px] transition group-active:-translate-y-1' />
        </button>
      </form>

      <div
        className={`
          absolute left-1/2 bottom-1/2 w-[calc(120%)] aspect-square -z-10 translate-y-1/2 -translate-x-1/2 
          [transition:opacity_2s_ease] ${gradientBorderOpacity}
        `}
      >
        <div className='w-full h-full [background:linear-gradient(to_right,#FC5C7D_20%,#6A82FB_80%)] animate-spin-pulse' />
      </div>
    </div>
  )
}
