import { useChatStore } from '@/store/useChatStore'
import { useEffect, useRef, useState } from 'react'

const CHAT_ON_BOTTOM_SCROLL_THRESHOLD = 20

interface Params {
  updateScrollOn: unknown[]
}

export const useChatCustomScroll = ({ updateScrollOn }: Params) => {
  const chatMessages = useChatStore(s => s.messages)
  const [scrollIsOnBottom, setScrollIsOnBottom] = useState(true)
  const isAutoScrollingDown = useRef(false)
  const isOnInitialScroll = useRef(true)

  const listRef = useRef<HTMLLIElement>(null)
  const scrollRef = useRef(null)

  // Set chat scroll height to an element's height to increase body scroll
  useEffect(() => {
    if (listRef.current !== null && scrollRef.current !== null) {
      listRef.current.style.overflowY = 'scroll'
      const { scrollHeight } = listRef.current
      listRef.current.style.overflowY = 'hidden'

      const scrollElement: HTMLDivElement = scrollRef.current
      scrollElement.style.height = `${scrollHeight}px`
    }
  }, [listRef.current, scrollRef.current, chatMessages, ...updateScrollOn])

  // Apply scroll made on the body to the chat
  useEffect(() => {
    const handleScroll = () => {
      if (listRef.current === null) return

      listRef.current.scrollTo({ top: window.scrollY })
      checkScrollOnBottom()
    }
    document.addEventListener('scroll', handleScroll)
    return () => document.removeEventListener('scroll', handleScroll)
  }, [])

  // Handle scroll on bottom checking logic
  const checkScrollOnBottom = () => {
    if (listRef.current === null) return

    const { scrollTop, scrollHeight, clientHeight } = listRef.current
    const scrollDifference = scrollHeight - scrollTop

    const newScrollIsOnBottom =
      Math.abs(clientHeight - scrollDifference) < CHAT_ON_BOTTOM_SCROLL_THRESHOLD
    if (newScrollIsOnBottom) isAutoScrollingDown.current = false

    setScrollIsOnBottom(newScrollIsOnBottom)
  }

  // Scroll to bottom on new message
  useEffect(() => {
    if (scrollIsOnBottom && chatMessages !== null && chatMessages.length > 0) {
      scrollToBottom(isOnInitialScroll.current ? 'instant' : 'smooth')
      isOnInitialScroll.current = false
    }
  }, [chatMessages, ...updateScrollOn])

  const scrollToBottom = (behavior: ScrollBehavior) => {
    window.scrollTo({ top: document.documentElement.scrollHeight, behavior })
    isAutoScrollingDown.current = true
  }

  const scrollDownButtonProps: { onClick: () => void; style: React.CSSProperties } = {
    style:
      scrollIsOnBottom || isAutoScrollingDown.current
        ? { opacity: 0, pointerEvents: 'none' }
        : { opacity: 1, pointerEvents: 'auto' },
    onClick: () => scrollToBottom('smooth')
  }

  return { listRef, scrollRef, scrollDownButtonProps }
}
