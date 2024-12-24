import { CardMate } from '@/components/CardMate'
import { ChipButton } from '@/components/ChipButton'
import { Header } from '@/components/Header'
import { Paragraph } from '@/components/Paragraph'
import { CheckListIcon, MagicWandIcon, MessageIcon } from '@/components/icons'
import { useCompleteTasks } from '@/hooks/useCompleteTasks'
import { useUserPrompts } from '@/hooks/useUserPrompts'
import type { UserStudyplan } from '@/types.d'
import { Task } from './Task'

type Props = UserStudyplan['daily_lessons'][number]

export const TodaysTasks = ({ desc, tasks }: Props) => {
  const prompts = useUserPrompts({ redirect: true })
  const { completeTask } = useCompleteTasks()

  return (
    <>
      <div className='flex flex-col gap-4'>
        <Header s={3}>
          Today's tasks
          <CheckListIcon className='size-8' />
        </Header>

        <Paragraph>{desc}</Paragraph>
      </div>

      <CardMate
        message='Lorem ipsum dolor, sit amet consectetur adipisicing elit. Itaque eius delectus excepturi
        quo iure?'
      >
        <ChipButton empty onClick={prompts.blank}>
          <MagicWandIcon /> Explain tasks
        </ChipButton>
        <ChipButton onClick={prompts.blank}>
          <MessageIcon /> Chat
        </ChipButton>
      </CardMate>

      <section className='flex flex-col gap-3'>
        {tasks.map(({ goal, done }, i) => (
          <Task {...{ goal, done, index: i, completeTask }} key={i} />
        ))}
      </section>
    </>
  )
}
