import { useUserStudyplan } from '@/hooks/useUserStudyplan'
import { showAlert } from '@/lib/utils/showAlert'
import { DropdownMenu } from '@components/DropdownMenu/DropdownMenu'
import { Line } from '@components/DropdownMenu/Line'
import { Option } from '@components/DropdownMenu/Option'
import { CloudIcon, ReloadIcon, RocketIcon, TrashIcon } from '@icons'

interface Props {
  usersCurrent: boolean
  isCompleted: boolean
}

export const OptionsButton = ({ usersCurrent, isCompleted }: Props) => {
  const { abandonStudyplan, seeOriginalStudyplan, startStudyplan } = useUserStudyplan({ fetchOnAwake: false })

  const handleAbandonStudyplan = () =>
    showAlert({
      message: "You're about to abandon your studyplan. Youre gonna lose all your progress!",
      acceptButton: {
        onClick: abandonStudyplan,
        text: 'Abandon studyplan',
        icon: <TrashIcon />
      }
    })

  const handleRestartStudyplan = () =>
    showAlert({
      message: "You're about to restart your studyplan. Youre gonna lose all your progress!",
      acceptButton: {
        onClick: startStudyplan,
        text: 'Restart studyplan',
        icon: <ReloadIcon />
      }
    })

  return (
    <DropdownMenu>
      {isCompleted && (
        <Option action={startStudyplan}>
          <RocketIcon /> Start studyplan again
        </Option>
      )}

      {usersCurrent && (
        <>
          <Option action={seeOriginalStudyplan}>
            <CloudIcon /> See original
          </Option>

          <Line />

          <Option danger action={handleRestartStudyplan}>
            <ReloadIcon /> Restart studyplan
          </Option>

          <Option danger action={handleAbandonStudyplan}>
            <TrashIcon /> Abandon studyplan
          </Option>
        </>
      )}
    </DropdownMenu>
  )
}
