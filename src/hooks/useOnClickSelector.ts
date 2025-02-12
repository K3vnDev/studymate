import { useEvent } from '@hooks/useEvent'

export const useOnClickSelector = (selector: string, action: (hasClicked: boolean) => void) => {
  useEvent('pointerdown', (e: PointerEvent) => {
    if (!e.target) return

    const clickedElement = e.target as HTMLElement
    const hasClicked = clickedElement.closest(selector) !== null
    action(hasClicked)
  })
}
