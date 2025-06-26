import { EVENTS } from '@/consts'
import { ChatContext } from '@/lib/context/ChatContext'
import { dispatchEvent } from '@/lib/utils/dispatchEvent'
import { ArrowIcon } from '@icons'
import { useContext } from 'react'

export const ScrollDownButton = () => {
  const { scrollIsOnBottom } = useContext(ChatContext)

  const handleClick = () => {
    dispatchEvent(EVENTS.ON_CHAT_SCROLL_DOWN)
  }

  const isVisible = !scrollIsOnBottom
  const style = isVisible
    ? 'opacity-100 scale-100 pointer-events-auto'
    : 'opacity-0 scale-75 pointer-events-none'

  return (
    <button
      className={`
        transition-all duration-200 absolute left-1/2 -translate-x-1/2 bottom-[5.5rem] rounded-full 
        border border-gray-20 p-2 bg-gray-60 button ${style}
      `}
      onClick={handleClick}
    >
      <ArrowIcon className='text-gray-20' />
    </button>
  )
}
