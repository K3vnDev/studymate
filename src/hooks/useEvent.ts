import { useEffect } from 'react'

export const useEvent = <T>(
  eventName: string,
  eventHandler: (e: T) => void,
  dependencyArray: unknown[] = []
) => {
  useEffect(() => {
    document.addEventListener(eventName, eventHandler as EventHandler)
    return () => document.removeEventListener(eventName, eventHandler as EventHandler)
  }, [...dependencyArray])
}
type EventHandler = (e: Event) => void
