import { ChipButton } from '@/components/ChipButton'
import { Header } from '@/components/Header'
import { MateCard } from '@/components/MateCard'
import { Paragraph } from '@/components/Paragraph'
import { CheckListIcon, MagicWandIcon, MessageIcon } from '@/components/icons'
import { useUserPrompts } from '@/hooks/useUserPrompts'
import type { UserStudyplan } from '@/types.d'
import { Task } from './Task'

type Props = UserStudyplan['daily_lessons'][number]

export const TodaysTasks = ({ desc, tasks }: Props) => {
  const prompts = useUserPrompts({ redirect: true })

  return (
    <>
      <div className='flex flex-col gap-4'>
        <Header s={3}>
          Today's tasks
          <CheckListIcon className='size-8' />
        </Header>

        <Paragraph>{desc}</Paragraph>
      </div>

      <MateCard
        message='Lorem ipsum dolor, sit amet consectetur adipisicing elit. Itaque eius delectus excepturi
        quo iure?'
      >
        <ChipButton empty onClick={prompts.blank}>
          <MagicWandIcon /> Explain tasks
        </ChipButton>
        <ChipButton onClick={prompts.blank}>
          <MessageIcon /> Chat
        </ChipButton>
      </MateCard>

      <section className='flex flex-col gap-3'>
        {tasks.map((task, i) => (
          <Task {...task} key={i} />
        ))}
      </section>
    </>
  )
}
