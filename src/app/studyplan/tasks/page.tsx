'use client'

import { Loading } from '@/components/Loading'
import { Main } from '@/components/Main'
import { Sidebar } from '@/components/Sidebar'
import { useUserStudyplan } from '@/hooks/useUserStudyplan'
import { TodaysTasks } from './TodaysTasks'

export default function TasksPage() {
  const [userStudyplan] = useUserStudyplan()
  const todaysTasks = userStudyplan?.daily_lessons[userStudyplan.current_day - 1]

  return (
    <>
      <Main className='gap-12 px-24 py-12 h-full relative'>
        {userStudyplan && todaysTasks ? <TodaysTasks {...todaysTasks} /> : <Loading />}
      </Main>

      <Sidebar />
    </>
  )
}

const Task = () => {}
