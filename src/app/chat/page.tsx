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
import { Button, ErrorCard, Gigant, Message } from '@components/ErrorCard'
import { MagicWandIcon, ReloadIcon } from '@icons'
import { Header } from './Header'
import { Input } from './Input'
import { MessagesList } from './MessagesList'
import { ScrollDownButton } from './ScrollDownButton'

export default function ChatPage() {
  useUserStudyplan()
  const messages = useChatStore(s => s.messages)
  const prompt = useUserPrompts()

  const { loadPreviousMessages, ...chatMessagesValues } = useChatMessages()
  const { isWaitingResponse, isOnChatError, isOnLoadingError } = chatMessagesValues

  const customScrollValues = useChatCustomScroll({
    updateScrollOn: [isWaitingResponse, isOnChatError]
  })

  return (
    <ChatContext.Provider value={{ ...chatMessagesValues, ...customScrollValues }}>
      <Main className='items-center h-[calc(100vh-3rem)] flex-col justify-between fixed right-48 top-6 px-48 w-[calc(100%-56rem)]'>
        {!isOnLoadingError ? (
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
        ) : (
          <ErrorCard>
            <Gigant />
            <Message>Sorry, couldn't load your messages</Message>
            <Button onClick={loadPreviousMessages}>
              <ReloadIcon className='size-7 group-active:rotate-90 transition' />
              Try again
            </Button>
          </ErrorCard>
        )}
      </Main>

      <div className='w-8 bg-transparent pointer-events-none' ref={customScrollValues.scrollRef} />

      <Sidebar />
    </ChatContext.Provider>
  )
}
