import { FONTS } from '@/consts'
import { DropdownMenuContext } from '@/lib/context/DropdownMenuContext'
import { useContext } from 'react'

interface Props {
  children: React.ReactNode
  action: () => void
  danger?: boolean
}

export const Option = ({ children, action, danger = false }: Props) => {
  const { manage } = useContext(DropdownMenuContext)

  const handleClick = () => {
    action()
    manage.close()
  }

  const style = danger ? 'text-red-500 hover:bg-red-600/15' : 'text-gray-10 hover:bg-gray-50'

  return (
    <button
      className={`${FONTS.INTER} ${style} py-3 pl-4 pr-9 w-full flex text-nowrap card group`}
      onClick={handleClick}
    >
      <span className='group-active:scale-95 transition flex gap-2 items-center *:size-6'>{children}</span>
    </button>
  )
}
