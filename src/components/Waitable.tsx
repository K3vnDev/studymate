import { LoadingIcon } from '@icons'
import { useEffect, useRef, useState } from 'react'

interface Params {
  children: React.ReactNode
  isWaiting?: boolean
}

export const Waitable = ({ children, isWaiting = false }: Params) => {
  const initialChildren = useRef(children)
  const hasBeenWaiting = useRef(false)

  const [parsedChilren, setParsedChilren] = useState(children)

  useEffect(() => {
    if (hasBeenWaiting.current) return
    initialChildren.current = children
  }, [children])

  useEffect(() => {
    if (isWaiting) {
      hasBeenWaiting.current = true
    }

    setParsedChilren(() =>
      isWaiting && Array.isArray(children) && children.length === 2
        ? [<LoadingIcon className='animate-spin' key={0} />, children[1]]
        : initialChildren.current
    )
  }, [isWaiting, children])

  return parsedChilren
}
