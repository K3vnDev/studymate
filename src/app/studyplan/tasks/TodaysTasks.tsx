import { CardMate } from '@/components/CardMate'
import { ChipButton } from '@/components/ChipButton'
import { Header } from '@/components/Header'
import { Paragraph } from '@/components/Paragraph'
import { CheckListIcon, MagicWandIcon, MessageIcon } from '@/components/icons'
import { MATE_MESSAGES } from '@/consts'
import { useUserPrompts } from '@/hooks/useUserPrompts'
import type { UserStudyplan } from '@/types.d'
import { Task } from './Task'

type Props = UserStudyplan['daily_lessons'][number]

export const TodaysTasks = ({ desc, tasks }: Props) => {
  const prompts = useUserPrompts({ redirect: true })
  const allTasksAreDone = tasks.every(t => t.done)

  const mateMessage = allTasksAreDone ? MATE_MESSAGES.TASKS.DONE : MATE_MESSAGES.TASKS.NOT_DONE

  return (
    <>
      <div className='flex flex-col gap-4'>
        <Header s={3}>
          Today's tasks
          <CheckListIcon className='size-8' />
        </Header>

        <Paragraph>{desc}</Paragraph>
      </div>

      <CardMate message={mateMessage}>
        {allTasksAreDone ? (
          <ChipButton empty onClick={prompts.blank}>
            <MagicWandIcon /> What's next?
          </ChipButton>
        ) : (
          <ChipButton empty onClick={prompts.blank}>
            <MagicWandIcon /> Explain tasks
          </ChipButton>
        )}

        <ChipButton onClick={prompts.blank}>
          <MessageIcon /> Chat
        </ChipButton>
      </CardMate>

      <section className='flex flex-col gap-3'>
        {tasks.map(({ goal, done }, i) => (
          <Task {...{ goal, done, index: i }} key={i} />
        ))}
      </section>
    </>
  )
}
