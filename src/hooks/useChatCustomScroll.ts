import { CHAT_ON_BOTTOM_THRESHOLD } from '@/consts'
import { getElementRef } from '@/lib/utils/getElementRef'
import { useChatsStore } from '@/store/useChatsStore'
import { useEffect, useRef, useState } from 'react'

interface Params {
  updateScrollOn: any[]
}

export const useChatCustomScroll = ({ updateScrollOn }: Params) => {
  const chatMessages = useChatsStore(s => s.chatMessages)
  const [scrollIsOnBottom, setScrollIsOnBottom] = useState(true)
  const isAutoScrollingDown = useRef(false)
  const isOnInitialScroll = useRef(true)

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
  }, [listRef.current, scrollRef.current, chatMessages, ...updateScrollOn])

  // Apply scroll made on the body to the chat
  useEffect(() => {
    const handleScroll = () => {
      const listElement = getElementRef<HTMLUListElement>(listRef)
      listElement.scrollTo({ top: window.scrollY })

      checkScrollOnBottom()
    }
    document.addEventListener('scroll', handleScroll)
    return () => document.removeEventListener('scroll', handleScroll)
  }, [])

  // Handle scroll on bottom checking logic
  const checkScrollOnBottom = () => {
    const listElement = getElementRef<HTMLUListElement>(listRef)
    const { scrollTop, scrollHeight, clientHeight } = listElement
    const scrollDifference = scrollHeight - scrollTop

    const newScrollIsOnBottom = Math.abs(clientHeight - scrollDifference) < CHAT_ON_BOTTOM_THRESHOLD
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
