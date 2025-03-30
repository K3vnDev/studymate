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
import { ScrollHelper } from './ScrollHelper'

export default function ChatPage() {
  useUserStudyplan()
  const messages = useChatStore(s => s.messages)

  const { loadPreviousMessages, ...chatMessagesValues } = useChatMessages()
  const { isWaitingResponse, isOnChatError, isOnLoadingError } = chatMessagesValues

  const customScrollValues = useChatCustomScroll({
    updateScrollOn: [isWaitingResponse, isOnChatError]
  })

  const classNames = {
    width: `3xl:max-w-[calc(100vw-22vw-4rem-24rem)] 2xl:max-w-[calc(100vw-22vw-4rem-16rem)] 
      xl:max-w-[calc(100vw-22vw-4rem-8rem)] lg:max-w-[calc(100vw-16rem)] sm:max-w-[calc(100vw-4rem)] 
      xs:max-w-[calc(100vw-3rem)] max-w-[calc(100vw-1rem)]`,

    heigth: 'xl:h-[calc(100dvh-3rem)] max-xl:min-h-0 sm:h-[calc(100dvh-5.5rem)] h-[calc(100dvh-5rem)]',

    right: '3xl:right-48 2xl:right-32 xl:right-16 lg:right-32 sm:right-8 xs:right-4 right-2'
  }

  return (
    <ChatContext.Provider value={{ ...chatMessagesValues, ...customScrollValues }}>
      <Main
        className={`
          items-center flex-col justify-between fixed 
          xl:rounded-3xl rounded-b-none xl:border border-b-0 top-6
          3xl:px-44 lg:px-28 sm:pb-12 pb-12 sm:pt-0 pt-0 sm:py-0 py-0 
          
          ${classNames.width} ${classNames.heigth} ${classNames.right}
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

      <ScrollHelper scrollRef={customScrollValues.scrollRef} />
    </ChatContext.Provider>
  )
}
