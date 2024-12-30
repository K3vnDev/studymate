import { LoadingIcon } from '@icons'
import { useEffect, useRef, useState } from 'react'

interface Params {
  children: React.ReactNode
  isLoading: boolean
}

export const useLoadingIcon = ({ children, isLoading }: Params) => {
  const initialChildren = useRef(children)
  const [parsedChilren, setParsedChilren] = useState(children)

  useEffect(() => {
    setParsedChilren(() =>
      isLoading && Array.isArray(children) && children.length === 2
        ? [<LoadingIcon className='animate-spin' key={0} />, children[1]]
        : initialChildren.current
    )
  }, [isLoading])

  return { parsedChilren }
}
