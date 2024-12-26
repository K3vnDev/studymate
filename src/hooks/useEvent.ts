import { useEffect } from 'react'

export const useEvent = <T>(
  eventName: string,
  eventHandler: (e: T) => void,
  dependencyArray: unknown[] = []
) => {
  useEffect(() => {
    document.addEventListener(eventName, eventHandler as NormalEventHandler)
    return () => document.removeEventListener(eventName, eventHandler as NormalEventHandler)
  }, [...dependencyArray])
}
type NormalEventHandler = (e: Event) => void
