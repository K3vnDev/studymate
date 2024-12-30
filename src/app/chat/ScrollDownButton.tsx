import { ChatContext } from '@/lib/context/ChatContext'
import { ArrowIcon } from '@icons'
import { useContext } from 'react'

export const ScrollDownButton = () => {
  const { scrollDownButtonProps } = useContext(ChatContext)

  return (
    <button
      className='transition absolute left-1/2 -translate-x-1/2 bottom-[5.5rem] rounded-full border border-gray-20 p-2 bg-gray-60 button'
      {...scrollDownButtonProps}
    >
      <ArrowIcon className='text-gray-20' />
    </button>
  )
}
