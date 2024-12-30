import { DropdownMenuContext } from '@/lib/context/DropdownMenuContext'
import { useState } from 'react'

interface Props {
  icon?: React.ReactNode
  children: React.ReactNode
  className?: {
    button?: string
  }
}

export const DropdownMenu = ({ icon, children, className }: Props) => {
  const [isOpen, setIsOpen] = useState(false)

  const manage = {
    open: () => setIsOpen(true),
    close: () => setIsOpen(false)
  }

  return (
    <DropdownMenuContext.Provider value={{ isOpen, manage }}>
      <div className='relative'>
        <button
          onClick={manage.open}
          className={`${className?.button} aspect-square *:size-8 text-gray-10 button`}
        >
          {icon}
        </button>

        <article
          hidden={!isOpen}
          className={`
            absolute right-0 -bottom-1 translate-y-full z-40 bg-gray-70 border border-gray-30 
            rounded-xl py-2 min-w-32 shadow-card shadow-black/70
          `}
        >
          {children}
        </article>

        {isOpen && (
          <div
            className='fixed left-0 top-0 w-screen h-screen bg-black/10 z-30 cursor-default'
            onClick={manage.close}
          />
        )}
      </div>
    </DropdownMenuContext.Provider>
  )
}
