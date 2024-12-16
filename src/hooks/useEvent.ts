import { useEffect } from 'react'

export const useEvent = (
  eventName: string,
  eventHandler: (e: CustomEvent) => void,
  dependencyArray: unknown[]
) => {
  useEffect(() => {
    document.addEventListener(eventName, eventHandler as NormalEventHandler)
    return () => document.removeEventListener(eventName, eventHandler as NormalEventHandler)
  }, [...dependencyArray])
}
type NormalEventHandler = (e: Event) => void
