import { FONTS } from '@/consts'
import Image from 'next/image'
import { ClockIcon, HomeIcon, MessageIcon, ProfileIcon } from './icons'

export const Sidebar = () => {
  const paths = [
    {
      name: 'Dashboard',
      icon: <HomeIcon />
    },
    {
      name: 'Focus',
      icon: <ClockIcon />
    },
    {
      name: 'Chat',
      icon: <MessageIcon />
    },
    {
      name: 'Profile',
      icon: <ProfileIcon />
    }
  ]

  return (
    <aside className='w-[32rem] min-h-full flex flex-col gap-16 py-16'>
      <h2 className={`text-white text-3xl flex gap-3 items-center ${FONTS.POPPINS}`}>
        <Image src='/favicon.ico' alt='App logo' width={32} height={32} className='object-cover' />
        <div>
          <span className='font-semibold'>STUDY</span>
          <span className='italic'>MATE</span>
        </div>
      </h2>
      <ul className='flex flex-col items-start gap-8'>
        {paths.map(({ name, icon }) => (
          <li key={name} className='flex gap-4 text-[#CCCCCC] button'>
            <div className='*:size-8 *:stroke-[1.5px]'>{icon}</div>
            <span className={`text-xl font-medium ${FONTS.POPPINS}`}>{name}</span>
          </li>
        ))}
      </ul>
    </aside>
  )
}
