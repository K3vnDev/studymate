import { createContext } from 'react'

interface DropdownMenuContext {
  isOpen: boolean
  manage: {
    open: () => void
    close: () => void
    toggle: () => void
  }
}

export const DropdownMenuContext = createContext<DropdownMenuContext>({
  isOpen: true,
  manage: { open: () => {}, close: () => {}, toggle: () => {} }
})
