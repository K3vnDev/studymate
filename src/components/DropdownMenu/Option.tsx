import { FONTS } from '@/consts'
import { useLoadingIcon } from '@/hooks/useLoadingIcon'
import { DropdownMenuContext } from '@/lib/context/DropdownMenuContext'
import { useContext, useState } from 'react'

interface Props {
  children: React.ReactNode
  action: (() => Promise<void>) | (() => void)
  danger?: boolean
}

export const Option = ({ children, action, danger = false }: Props) => {
  const [isLoading, setIsLoading] = useState(false)
  const { parsedChilren } = useLoadingIcon({ children, isLoading })
  const { manage } = useContext(DropdownMenuContext)

  const handleClick = async () => {
    setIsLoading(true)

    await action()

    setIsLoading(false)
    manage.close()
  }

  const style = danger ? 'text-error hover:bg-error/10' : 'text-gray-10 hover:bg-gray-50'

  return (
    <button
      className={`
        ${FONTS.INTER} ${style} py-3 pl-4 pr-9 w-full flex text-nowrap card group 
        disabled:brightness-75 disabled:pointer-events-none
      `}
      onClick={handleClick}
      disabled={isLoading}
    >
      <span className='group-active:scale-95 transition flex gap-2 items-center *:size-6'>
        {parsedChilren}
      </span>
    </button>
  )
}
