import { useUserStudyplan } from '@/hooks/useUserStudyplan'
import { DropdownMenu } from '@components/DropdownMenu/DropdownMenu'
import { Line } from '@components/DropdownMenu/Line'
import { Option } from '@components/DropdownMenu/Option'
import { CloudIcon, MoreIcon, ReloadIcon, RocketIcon, TrashIcon } from '@icons'

export const OptionsButton = ({ usersCurrent = false }) => {
  const { abandonStudyplan, seeOriginalStudyplan, startStudyplan } = useUserStudyplan({ fetchOnAwake: false })

  return (
    <DropdownMenu icon={<MoreIcon />}>
      <Option action={seeOriginalStudyplan}>
        <CloudIcon /> See original
      </Option>

      <Option action={startStudyplan}>
        <RocketIcon /> Start studyplan again
      </Option>

      <Line />

      <Option danger action={startStudyplan}>
        <ReloadIcon /> Restart studyplan
      </Option>

      <Option danger action={abandonStudyplan}>
        <TrashIcon /> Abandon studyplan
      </Option>
    </DropdownMenu>
  )
}
