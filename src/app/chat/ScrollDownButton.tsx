import { ArrowIcon } from '@/components/icons'
import { ChatContext } from '@/lib/context/ChatContext'
import { useContext } from 'react'

export const ScrollDownButton = () => {
  const { scrollDownButtonProps } = useContext(ChatContext)

  return (
    <button
      className='transition absolute left-1/2 -translate-x-1/2 bottom-[5.5rem] rounded-full border border-[#555555] p-2 bg-[#131313] button'
      {...scrollDownButtonProps}
    >
      <ArrowIcon className='text-[#555555]' />
    </button>
  )
}
