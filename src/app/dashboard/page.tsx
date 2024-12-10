import { MateCard } from '@/components/MateCard'
import { Sidebar } from '@/components/Sidebar'

export default function Dashboard() {
  return (
    <>
      <Sidebar />
      <main className='w-full min-h-full main-bg rounded-2xl border card-border p-12'>
        <MateCard />
      </main>
    </>
  )
}
