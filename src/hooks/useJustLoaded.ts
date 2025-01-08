import { useEffect, useRef, useState } from 'react'

export const useJustLoaded = (waitTime: number, dependencyArray: any[] = []) => {
  const [justLoaded, setJustLoaded] = useState(true)
  const timeout = useRef<NodeJS.Timeout>()

  useEffect(() => {
    setJustLoaded(true)
    timeout.current = setTimeout(() => {
      setJustLoaded(false)
    }, waitTime)
    return () => clearTimeout(timeout.current)
  }, dependencyArray)

  return justLoaded
}
