'use client'

import { useChatCustomScroll } from '@/hooks/useChatCustomScroll'
import { useChatMessages } from '@/hooks/useChatMessages'
import { ChatContext } from '@/lib/context/ChatContext'
import { Header } from './Header'
import { Input } from './Input'
import { MessagesList } from './MessagesList'
import { ScrollDownButton } from './ScrollDownButton'

export default function ChatPage() {
  const chatMessagesValues = useChatMessages()

  const customScrollValues = useChatCustomScroll({
    updateScrollOn: [chatMessagesValues.isWaitingResponse, chatMessagesValues.isOnError]
  })

  return (
    <ChatContext.Provider value={{ ...chatMessagesValues, ...customScrollValues }}>
      <main className='main items-center h-[calc(100vh-3rem)] flex-col justify-between fixed right-48 top-6 px-48'>
        <Header />
        <MessagesList />
        <Input />
        <ScrollDownButton />
      </main>

      {/* Scroll reference*/}
      <div className='w-8 bg-transparent pointer-events-none' ref={customScrollValues.scrollRef} />
    </ChatContext.Provider>
  )
}
