import { useChatsStore } from '@/store/useChatsStore'
import { getElementRef } from '@/utils/getElementRef'
import { useEffect, useRef, useState } from 'react'

export const useChatCustomScroll = () => {
  const chatMessages = useChatsStore(s => s.chatMessages)
  const [scrollIsOnBottom, setScrollIsOnBottom] = useState(false)

  const listRef = useRef(null)
  const scrollRef = useRef(null)

  // Set chat scroll height to an element's height to increase body scroll
  useEffect(() => {
    if (listRef.current !== null && scrollRef.current !== null) {
      const listElement: HTMLLIElement = listRef.current
      listElement.style.overflowY = 'scroll'
      const { scrollHeight } = listElement
      listElement.style.overflowY = 'hidden'

      const scrollElement: HTMLDivElement = scrollRef.current
      scrollElement.style.height = `${scrollHeight}px`
    }
  }, [listRef.current, scrollRef.current, chatMessages])

  // Apply scroll made on the body to the chat
  useEffect(() => {
    const handleScroll = () => {
      const listElement = getElementRef<HTMLUListElement>(listRef)
      listElement.scrollTo({ top: window.scrollY })
      checkScrollOnBottom(listElement)
    }
    document.addEventListener('scroll', handleScroll)
    return () => document.addEventListener('scroll', handleScroll)
  }, [])

  const checkScrollOnBottom = (listElement: HTMLUListElement) => {
    const { scrollTop, scrollHeight, clientHeight } = listElement
    const scrollDifference = scrollHeight - scrollTop

    const TRESHOLD = 20
    setScrollIsOnBottom(Math.abs(clientHeight - scrollDifference) < TRESHOLD)
  }

  const scrollDownButtonProps: { onClick: () => void; style: React.CSSProperties } = {
    onClick: () => {
      window.scrollTo({ top: document.documentElement.scrollHeight, behavior: 'smooth' })
    },
    style: {
      opacity: scrollIsOnBottom ? 0 : 1,
      pointerEvents: scrollIsOnBottom ? 'none' : 'auto'
    }
  }

  return { listRef, scrollRef, scrollDownButtonProps }
}
