import { useEffect, useState } from 'react'

export const useResponsiveness = () => {
  const [screenSize, setScreenSize] = useState<ScreenSize>({ x: 0, y: 0 })

  useEffect(() => {
    if (typeof window === 'undefined') return

    const handleResize = () => {
      const { innerWidth, innerHeight } = window
      setScreenSize({ x: innerWidth, y: innerHeight })
    }
    handleResize()

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return { screenSize }
}

interface ScreenSize {
  x: number
  y: number
}
