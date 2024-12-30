import { useEffect, useRef } from 'react'

export const useOnUser = () => {
  const userHasLeft = useRef(false)

  useEffect(() => {
    userHasLeft.current = false
    return () => {
      userHasLeft.current = true
    }
  }, [])

  const onUser = ({ gone = () => {}, stayed = () => {}, afterTimeout = () => {}, waitTime = 650 }) => {
    if (!userHasLeft.current) {
      stayed()
      setTimeout(() => {
        afterTimeout()
        gone()
      }, waitTime)
    } else gone()
  }

  return onUser
}
