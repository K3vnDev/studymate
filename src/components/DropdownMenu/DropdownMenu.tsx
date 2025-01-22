import { DropdownMenuContext } from '@/lib/context/DropdownMenuContext'
import { useEvent } from '@hooks/useEvent'
import { useOnClickOutside } from '@hooks/useOnClickOutside'
import { ChevronIcon, MoreIcon } from '@icons'
import { useState } from 'react'

interface Props {
  children: React.ReactNode
  className?: {
    button?: string
  }
}

export const DropdownMenu = ({ children, className }: Props) => {
  const [isOpen, setIsOpen] = useState(false)
  const ELEMENT_ID = 'dropdownmenu'

  const manage = {
    open: () => setIsOpen(true),
    close: () => setIsOpen(false),
    toggle: () => setIsOpen(v => !v)
  }

  useOnClickOutside(ELEMENT_ID, hasClickedOutside => {
    if (hasClickedOutside) manage.close()
  })

  useEvent('keydown', ({ key }: KeyboardEvent) => {
    if (key === 'Escape') manage.close()
  })

  const style = isOpen
    ? { menu: 'scale-100', bg: 'opacity-100', rotation: 'rotate-90' }
    : { menu: 'scale-0 pointer-events-none', bg: 'opacity-0 pointer-events-none', rotation: 'rotate-0' }

  return (
    <DropdownMenuContext.Provider value={{ isOpen, manage }}>
      <div className='relative'>
        <button
          onClick={manage.toggle}
          className={`${className?.button} aspect-square button *:size-8 ${style.rotation} text-gray-10`}
        >
          {isOpen ? <ChevronIcon className='-rotate-90' /> : <MoreIcon />}
        </button>

        <article
          className={`
            absolute right-0 -bottom-1 translate-y-full z-40 bg-gray-70 border border-gray-30 
            rounded-xl py-2 min-w-32 shadow-card shadow-black/70 origin-top-right ${style.menu} transition
          `}
          id={ELEMENT_ID}
        >
          {children}
        </article>
      </div>
    </DropdownMenuContext.Provider>
  )
}
