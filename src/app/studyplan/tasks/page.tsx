'use client'

import { Loadable } from '@/components/Loadable'
import { Main } from '@/components/Main'
import { Sidebar } from '@/components/Sidebar'
import { useUserStudyplan } from '@/hooks/useUserStudyplan'
import { TodaysTasks } from './TodaysTasks'

export default function TasksPage() {
  const { userStudyplan, isLoading } = useUserStudyplan({ redirectTo: '/dashboard' })
  const todaysTasks = userStudyplan?.daily_lessons[userStudyplan.current_day - 1]

  return (
    <>
      <Main className='gap-12 px-24 py-12 h-full relative'>
        <Loadable isLoading={isLoading}>{todaysTasks && <TodaysTasks {...todaysTasks} />}</Loadable>
      </Main>

      <Sidebar />
    </>
  )
}

const Task = () => {}
