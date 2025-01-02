import { useUserStudyplan } from '@/hooks/useUserStudyplan'
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

          <Option danger action={startStudyplan}>
            <ReloadIcon /> Restart studyplan
          </Option>

          <Option danger action={abandonStudyplan}>
            <TrashIcon /> Abandon studyplan
          </Option>
        </>
      )}
    </DropdownMenu>
  )
}
