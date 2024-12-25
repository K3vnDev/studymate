import { useEffect } from 'react'

interface Params {
  minIndex?: number
  maxIndex: number
  currentIndex: number
  action: (newIndex: number) => void
}

export const useVerticalNavigation = ({ minIndex = 0, maxIndex, currentIndex, action }: Params) => {
  useEffect(() => {
    const handleKeyDown = ({ key, ctrlKey, shiftKey }: KeyboardEvent) => {
      if (!ctrlKey && !shiftKey) return

      // biome-ignore format: <>
      if (key === 'ArrowUp') {
        const newIndex = currentIndex <= minIndex ? maxIndex : currentIndex - 1
        action(newIndex)

      } else if (key === 'ArrowDown') {
        const newIndex = currentIndex >= maxIndex ? minIndex : currentIndex + 1
        action(newIndex)
      }
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [currentIndex])
}
