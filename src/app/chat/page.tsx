'use client'

import { ChipButton } from '@/components/ChipButton'
import { MateCard } from '@/components/MateCard'
import { LoadingIcon, MagicWandIcon } from '@/components/icons'
import { MATE_MEET_MESSAGE } from '@/consts'
import { useChatCustomScroll } from '@/hooks/useChatCustomScroll'
import { useChatMessages } from '@/hooks/useChatMessages'
import { useUserPrompts } from '@/hooks/useUserPrompts'
import { ChatContext } from '@/lib/context/ChatContext'
import { useChatStore } from '@/store/useChatStore'
import { Header } from './Header'
import { Input } from './Input'
import { MessagesList } from './MessagesList'
import { ScrollDownButton } from './ScrollDownButton'

export default function ChatPage() {
  const messages = useChatStore(s => s.messages)
  const prompt = useUserPrompts({})
  const chatMessagesValues = useChatMessages()

  const customScrollValues = useChatCustomScroll({
    updateScrollOn: [chatMessagesValues.isWaitingResponse, chatMessagesValues.isOnError]
  })

  return (
    <ChatContext.Provider value={{ ...chatMessagesValues, ...customScrollValues }}>
      <main className='main items-center h-[calc(100vh-3rem)] flex-col justify-between fixed right-48 top-6 px-48'>
        {messages !== null ? (
          <>
            {messages.length ? (
              <>
                <Header />
                <MessagesList />
              </>
            ) : (
              <MateCard
                message={MATE_MEET_MESSAGE}
                onClick={prompt.blank}
                className='absolute top-1/2 -translate-y-[calc(100%+.75rem)]'
              >
                <ChipButton onClick={prompt.createStudyplan} empty>
                  <MagicWandIcon />
                  Create a studyplan
                </ChipButton>
              </MateCard>
            )}

            <Input />
            <ScrollDownButton />
          </>
        ) : (
          <div className='absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2'>
            <LoadingIcon className='size-20 animate-spin text-white/25' />
          </div>
        )}
      </main>
      <div className='w-8 bg-transparent pointer-events-none' ref={customScrollValues.scrollRef} />
    </ChatContext.Provider>
  )
}
