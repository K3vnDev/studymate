'use client'

import { CardMate } from '@/components/CardMate'
import { ChipButton } from '@/components/ChipButton'
import { Loadable } from '@/components/Loadable'
import { Main } from '@/components/Main'
import { Sidebar } from '@/components/Sidebar'
import { MATE_MESSAGES } from '@/consts'
import { useChatCustomScroll } from '@/hooks/useChatCustomScroll'
import { useChatMessages } from '@/hooks/useChatMessages'
import { useUserPrompts } from '@/hooks/useUserPrompts'
import { useUserStudyplan } from '@/hooks/useUserStudyplan'
import { ChatContext } from '@/lib/context/ChatContext'
import { useChatStore } from '@/store/useChatStore'
import { MagicWandIcon } from '@icons'
import { Header } from './Header'
import { Input } from './Input'
import { MessagesList } from './MessagesList'
import { ScrollDownButton } from './ScrollDownButton'

export default function ChatPage() {
  const messages = useChatStore(s => s.messages)
  const prompt = useUserPrompts()
  const chatMessagesValues = useChatMessages()
  useUserStudyplan()

  const customScrollValues = useChatCustomScroll({
    updateScrollOn: [chatMessagesValues.isWaitingResponse, chatMessagesValues.isOnError]
  })

  return (
    <ChatContext.Provider value={{ ...chatMessagesValues, ...customScrollValues }}>
      <Main className='items-center h-[calc(100vh-3rem)] flex-col justify-between fixed right-48 top-6 px-48 w-[calc(100%-56rem)]'>
        <Loadable isLoading={!messages}>
          {messages?.length ? (
            <>
              <Header />
              <MessagesList />
            </>
          ) : (
            <CardMate
              message={MATE_MESSAGES.MEET}
              className={{ main: 'absolute top-1/2 -translate-y-[calc(100%+.75rem)]' }}
            >
              <ChipButton onClick={prompt.createStudyplan} empty>
                <MagicWandIcon />
                Create a studyplan
              </ChipButton>
            </CardMate>
          )}

          <Input />
          <ScrollDownButton />
        </Loadable>
      </Main>

      <div className='w-8 bg-transparent pointer-events-none' ref={customScrollValues.scrollRef} />

      <Sidebar />
    </ChatContext.Provider>
  )
}
