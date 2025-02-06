import { FallbackZone } from '@/components/FallbackZone'
import { useResponsiveness } from '@/hooks/useResponsiveness'
import { useUserPrompts } from '@/hooks/useUserPrompts'
import { useUserStudyplan } from '@/hooks/useUserStudyplan'
import { CardMate } from '@components/CardMate'
import { CardStudyplan } from '@components/CardStudyplan'
import { ChipButton } from '@components/ChipButton'
import { MagicWandIcon, MessageIcon } from '@components/icons'
import { MATE_MESSAGES, SCREENS } from '@consts'

export const InitialSection = () => {
  const prompts = useUserPrompts({ redirect: true })
  const { userStudyplan, isLoading } = useUserStudyplan()
  const { screenSize } = useResponsiveness()

  if (isLoading) {
    return <FallbackZone className='w-[32rem] h-40 bg-zinc-600' />
  }

  if (userStudyplan) {
    return <CardStudyplan className='max-w-[32rem] w-full' studyplan={userStudyplan} userCurrent />
  }

  const buttonLabel = screenSize.x >= SCREENS.LG ? 'Create a studyplan' : 'Plan'

  return (
    <CardMate message={MATE_MESSAGES.MEET}>
      <ChipButton empty onClick={prompts.createStudyplan}>
        <MagicWandIcon />

        {buttonLabel}
      </ChipButton>
      <ChipButton onClick={prompts.blank}>
        <MessageIcon />
        Chat
      </ChipButton>
    </CardMate>
  )
}
