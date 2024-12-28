import { CONTENT_JSON } from '@/consts'
import { dataFetch } from '@/lib/utils/dataFetch'
import { useUserStore } from '@/store/useUserStore'
import type { UserStudyplan } from '@/types.d'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { ChipButton } from '../ChipButton'
import { RocketIcon } from '../icons'
import type { Props as StudyplanProps } from './Studyplan'

type Props = Omit<StudyplanProps, 'usersCurrent'>

export const StartButton = ({ studyplan }: Props) => {
  const [isLoading, setIsLoading] = useState(false)
  const setUserStudyplan = useUserStore(s => s.setStudyplan)
  const router = useRouter()

  const handleStartStudyplan = () => {
    setIsLoading(true)

    dataFetch<UserStudyplan | null>({
      url: '/api/user/studyplan',
      options: { method: 'POST', headers: CONTENT_JSON, body: JSON.stringify(studyplan) },

      onSuccess: data => {
        setUserStudyplan(data)
        router.replace('/studyplan')
      }
    })
  }

  return (
    <ChipButton onClick={handleStartStudyplan} isLoading={isLoading}>
      <RocketIcon /> Start this studyplan
    </ChipButton>
  )
}
