import { useUserStudyplan } from '@/hooks/useUserStudyplan'
import { MoreIcon } from '../icons'

export const OptionsButton = ({ usersCurrent = false }) => {
  const { abandonStudyplan, navigateToOriginal } = useUserStudyplan({ fetchOnAwake: false })

  const handleClick = () => {
    if (usersCurrent) {
      abandonStudyplan()
      navigateToOriginal()
    }
  }
  return (
    <button className='absolute right-0 top-0 button' onClick={handleClick}>
      <MoreIcon className='text-gray-10 size-7' />
    </button>
  )
}
