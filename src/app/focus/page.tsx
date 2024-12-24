'use client'

import { Loading } from '@/components/Loading'
import { Main } from '@/components/Main'
import { Sidebar } from '@/components/Sidebar'
import { useUserStudyplan } from '@/hooks/useUserStudyplan'
import { CurrentTask } from './CurrentTask'
import { InfoHeader } from './InfoHeader'
import { Timer } from './Timer'

export default function FocusPage() {
  const { userStudyplan } = useUserStudyplan()
  const tasks = userStudyplan?.daily_lessons[userStudyplan.current_day - 1].tasks

  return (
    <>
      <Main className='gap-12 px-24 py-12 max-h-full min-h-full relative'>
        {userStudyplan && tasks ? (
          <div className='flex flex-col items-center h-full justify-between'>
            <InfoHeader {...userStudyplan} />
            <Timer />
            <CurrentTask {...{ tasks }} />
          </div>
        ) : (
          <Loading />
        )}
      </Main>
      <Sidebar />
    </>
  )
}
