import { useEffect, useState } from 'react'

/**
 * A custom React hook that provides responsive screen dimensions and loading state.
 *
 * This hook tracks the current window dimensions and provides a loading state to ensure
 * the component has access to accurate screen size information after the initial render.
 *
 * @returns {Object} An object containing screen dimensions and loading state
 * @returns {ScreenSize} returns.screenSize - Current screen dimensions
 * @returns {boolean} returns.loaded - Whether the hook has finished initializing
 */
export const useResponsiveness = () => {
  const [screenSize, setScreenSize] = useState<ScreenSize>({ x: 0, y: 0 })
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      const { innerWidth, innerHeight } = window
      setScreenSize({ x: innerWidth, y: innerHeight })
    }
    handleResize()
    setLoaded(true)

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return { screenSize, loaded }
}

/**
 * Interface representing screen dimensions
 */
interface ScreenSize {
  /** Screen width in pixels */
  x: number
  /** Screen height in pixels */
  y: number
}
