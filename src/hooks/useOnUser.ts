import { useEffect, useRef } from 'react'

export const useOnUser = () => {
  const userHasLeft = useRef(false)

  useEffect(() => {
    userHasLeft.current = false
    return () => {
      userHasLeft.current = true
    }
  }, [])

  const onUser = ({ gone = () => {}, stayed = () => {}, stayedWaitTime = () => {}, waitTime = 650 }) => {
    if (!userHasLeft.current) {
      stayed()
      setTimeout(() => {
        stayedWaitTime()
        gone()
      }, waitTime)
    } else gone()
  }

  return onUser
}
