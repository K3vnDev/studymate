'use client'

import { ChatContext } from '@/lib/context/ChatContext'
import { useChatStore } from '@/store/useChatStore'
import { Button, ErrorCard, Gigant, Message } from '@components/ErrorCard'
import { Loadable } from '@components/Loadable'
import { Main } from '@components/Main'
import { useChatCustomScroll } from '@hooks/useChatCustomScroll'
import { useChatMessages } from '@hooks/useChatMessages'
import { useUserStudyplan } from '@hooks/useUserStudyplan'
import { ReloadIcon } from '@icons'
import { MessagesScreen } from './MessagesScreen'
import { NoMessagesScreen } from './NoMessagesScreen'

export default function ChatPage() {
  useUserStudyplan()
  const messages = useChatStore(s => s.messages)

  const { loadPreviousMessages, ...chatMessagesValues } = useChatMessages()
  const { isWaitingResponse, isOnChatError, isOnLoadingError } = chatMessagesValues

  const customScrollValues = useChatCustomScroll({
    updateScrollOn: [isWaitingResponse, isOnChatError]
  })

  return (
    <ChatContext.Provider value={{ ...chatMessagesValues, ...customScrollValues }}>
      <Main
        className={`
          items-center flex-col justify-between fixed xl:top-6 sm:top-[5.5rem] top-[5rem]
          3xl:right-48 2xl:right-32 xl:right-16 lg:right-32 sm:right-8 xs:right-4 right-2 3xl:px-44 lg:px-28 pb-12 pt-0
          xl:rounded-3xl rounded-b-none xl:border border-b-0

          xl:h-[calc(100dvh-3rem)] max-xl:min-h-0 sm:h-[calc(100dvh-5.5rem)] h-[calc(100dvh-5rem)]

          3xl:w-[calc(100vw-22vw-4rem-12rem*2)] 2xl:w-[calc(100vw-22vw-4rem-8rem*2)] xl:w-[calc(100vw-22vw-4rem-4rem*2)] 
          lg:w-[calc(100vw-8rem*2)] sm:w-[calc(100vw-2rem*2)] xs:w-[calc(100vw-1rem*2)] w-[calc(100vw-0.5rem*2)]
        `}
      >
        {!isOnLoadingError ? (
          <Loadable isLoading={!messages}>
            {messages?.length ? <MessagesScreen /> : <NoMessagesScreen />}
          </Loadable>
        ) : (
          <ErrorCard>
            <Gigant>Ooops...</Gigant>
            <Message>Sorry, couldn't load your messages</Message>
            <Button onClick={loadPreviousMessages}>
              <ReloadIcon className='size-7 group-active:rotate-90 transition' />
              Try again
            </Button>
          </ErrorCard>
        )}
      </Main>

      <div className='w-8 bg-transparent pointer-events-none' ref={customScrollValues.scrollRef} />
    </ChatContext.Provider>
  )
}
