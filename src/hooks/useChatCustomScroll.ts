import { useChatsStore } from '@/store/useChatsStore'
import { useEffect, useRef } from 'react'

export const useChatCustomScroll = () => {
  const chatMessages = useChatsStore(s => s.chatMessages)
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
      if (listRef.current === null) return
      const listElement: HTMLLIElement = listRef.current
      listElement.scrollTo({ top: window.scrollY })
    }
    document.addEventListener('scroll', handleScroll)
    return () => document.addEventListener('scroll', handleScroll)
  }, [])

  return { listRef, scrollRef }
}
