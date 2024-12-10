import { Header1 } from '@/components/Header1'
import { MateCard } from '@/components/MateCard'
import { Sidebar } from '@/components/Sidebar'
import { StudyplanItem } from '@/components/StudyplanItem'
import { STUDYPLANS_MOCK } from '@/mocks'

export default function Dashboard() {
  return (
    <>
      <Sidebar />
      <main className='w-full min-h-full main-bg rounded-2xl border card-border p-12 flex flex-col gap-12'>
        <MateCard />

        <section className='flex flex-col gap-4'>
          <Header1>Study Plans for You</Header1>
          <ul className='flex gap-4'>
            {STUDYPLANS_MOCK.map((studyplan, i) => (
              <StudyplanItem key={i} {...studyplan} />
            ))}
          </ul>
        </section>
      </main>
    </>
  )
}
