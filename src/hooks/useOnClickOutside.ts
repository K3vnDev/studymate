import { useEvent } from './useEvent'

export const useOnClickOutside = (elementId: string, callback: (hasClickedOutside: boolean) => void) => {
  useEvent('pointerdown', (e: PointerEvent) => {
    if (!e.target) return

    const clickedElement = e.target as HTMLElement
    const hasClickedOutside = clickedElement.closest(`#${elementId}`) === null
    callback(hasClickedOutside)
  })
}
