import { useUserStudyplan } from '@/hooks/useUserStudyplan'
import { useState } from 'react'
import { ChipButton } from '../ChipButton'
import { RocketIcon } from '../icons'

export const StartButton = () => {
  const [isLoading, setIsLoading] = useState(false)
  const { startStudyplan } = useUserStudyplan()

  const handleStartStudyplan = async () => {
    setIsLoading(true)
    await startStudyplan()
    setIsLoading(false)
  }

  return (
    <ChipButton onClick={handleStartStudyplan} isLoading={isLoading}>
      <RocketIcon /> Start this studyplan
    </ChipButton>
  )
}
