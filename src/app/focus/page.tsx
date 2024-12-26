'use client'

import { Loading } from '@/components/Loading'
import { Main } from '@/components/Main'
import { Sidebar } from '@/components/Sidebar'
import { useUserStudyplan } from '@/hooks/useUserStudyplan'
import { CurrentTask } from './CurrentTask'
import { InfoHeader } from './InfoHeader'
import { Timer } from './Timer'

export default function FocusPage() {
  const { userStudyplan, getUtilityValues } = useUserStudyplan()
  const currentTaskValues = getUtilityValues()

  return (
    <>
      <Main className='gap-12 px-24 py-12 max-h-full min-h-full relative'>
        {userStudyplan && currentTaskValues ? (
          <div className='flex flex-col items-center h-full justify-between'>
            <InfoHeader {...userStudyplan} />
            <Timer />
            <CurrentTask {...currentTaskValues} />
          </div>
        ) : (
          <Loading />
        )}
      </Main>
      <Sidebar />
    </>
  )
}
