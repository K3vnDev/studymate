import { useChatStore } from '@/store/useChatStore'
import { useEvent } from '@hooks/useEvent'
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

  const listRef = useRef<HTMLUListElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)

  // update scrollElement's height to increase body scroll
  useEffect(() => {
    const recalculateScrollHeight = () => {
      if (!listRef.current || !scrollRef.current) return
      listRef.current.style.overflowY = 'scroll'

      const { scrollHeight } = listRef.current

      const { bottom } = listRef.current.getBoundingClientRect()
      const listRefBottom = window.innerHeight - bottom

      // Apply scroll height
      listRef.current.style.overflowY = 'hidden'
      scrollRef.current.style.height = `${scrollHeight + listRefBottom + 25}px` // Find out where that 25 comes from
    }

    window.addEventListener('resize', recalculateScrollHeight)
    recalculateScrollHeight()

    return () => window.removeEventListener('resize', recalculateScrollHeight)
  }, [listRef.current, scrollRef.current, chatMessages, ...updateScrollOn])

  const handleScroll = () => {
    // Apply scroll made on the body to the chat
    if (listRef.current === null) return
    listRef.current.scrollTo({ top: window.scrollY })

    // Handle scroll on bottom checking logic
    const { scrollTop, scrollHeight, clientHeight } = listRef.current
    const scrollDifference = scrollHeight - scrollTop

    const newScrollIsOnBottom = Math.abs(clientHeight - scrollDifference) < CHAT_ON_BOTTOM_SCROLL_THRESHOLD
    if (newScrollIsOnBottom) isAutoScrollingDown.current = false

    setScrollIsOnBottom(newScrollIsOnBottom)
  }
  // Call the above function whenever the user scrolls
  useEvent('scroll', handleScroll, [scrollIsOnBottom])

  // Scroll to bottom on new message
  useEffect(() => {
    if (scrollIsOnBottom && chatMessages !== null && chatMessages.length > 0) {
      const behavior = isOnInitialScroll.current ? 'instant' : 'smooth'
      scrollToBottom(behavior)

      isOnInitialScroll.current = false
    }
  }, [chatMessages, ...updateScrollOn]) // Maybe remove updateScrollOn ???

  const scrollToBottom = (behavior: ScrollBehavior) => {
    window.scrollTo({ top: document.documentElement.scrollHeight, behavior })
    isAutoScrollingDown.current = true
  }

  // TODO: Make this event-driven / put the logic on the button itself
  const scrollDownButtonProps: { onClick: () => void; style: React.CSSProperties } = {
    style:
      scrollIsOnBottom || isAutoScrollingDown.current
        ? { opacity: 0, pointerEvents: 'none' }
        : { opacity: 1, pointerEvents: 'auto' },
    onClick: () => scrollToBottom('smooth')
  }

  return { listRef, scrollRef, scrollDownButtonProps }
}
