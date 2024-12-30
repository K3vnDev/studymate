import { Header } from '@/components/Header'
import type { UserStudyplan } from '@/types.d'
import { MoreIcon } from '@icons'

export const InfoHeader = ({ name, current_day }: UserStudyplan) => {
  return (
    <div className='flex w-full justify-between'>
      <div className='flex flex-col gap-3'>
        <span className='text-gray-10 text-xl font-medium'>You're focusing on</span>
        <Header s={3}>{name}</Header>
        <span className='text-gray-10'>Day {current_day}</span>
      </div>
      <MoreIcon className='text-gray-10 size-7 button' />
    </div>
  )
}
