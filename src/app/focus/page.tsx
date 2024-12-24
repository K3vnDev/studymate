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

  return (
    <>
      <Main className='gap-12 px-24 py-12 max-h-full min-h-full relative'>
        {userStudyplan ? (
          <div className='flex flex-col items-center h-full justify-between'>
            <InfoHeader {...userStudyplan} />
            <Timer />

            {(() => {
              const { daily_lessons, current_day: day } = userStudyplan
              return <CurrentTask tasks={daily_lessons[day].tasks} />
            })()}
          </div>
        ) : (
          <Loading />
        )}
      </Main>
      <Sidebar />
    </>
  )
}
