import { useEffect } from 'react'

/**
 * @param eventName - The name of the event to listen for
 * @param eventHandler - The function to call when the event is triggered
 * @param dependencyArray - An array of dependencies that will refresh the event listener
 */

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
