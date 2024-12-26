import { useEvent } from './useEvent'

interface Params {
  minIndex?: number
  maxIndex: number
  currentIndex: number
  action: (newIndex: number) => void
}

export const useVerticalNavigation = ({ minIndex = 0, maxIndex, currentIndex, action }: Params) => {
  useEvent<KeyboardEvent>(
    'keydown',
    ({ key, ctrlKey, shiftKey }) => {
      if (!ctrlKey && !shiftKey) return

      // biome-ignore format: <>
      if (key === 'ArrowUp') {
      const newIndex = currentIndex <= minIndex ? maxIndex : currentIndex - 1
      action(newIndex)
      
    } else if (key === 'ArrowDown') {
      const newIndex = currentIndex >= maxIndex ? minIndex : currentIndex + 1
      action(newIndex)
    }
    },
    [currentIndex]
  )
}
