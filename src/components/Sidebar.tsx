'use client'

import { FONTS } from '@consts'
import { AppIcon, BookIcon, ClockIcon, HomeIcon, MessageIcon, ProfileIcon } from '@icons'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

export const Sidebar = () => (
  <aside className='w-[32rem] flex flex-col gap-16 justify-center items-start fixed left-48 top-1/2 -translate-y-1/2'>
    <h2 className={`text-white text-3xl flex gap-5 items-center ml-4 ${FONTS.POPPINS}`}>
      <AppIcon width={40} height={40} />
      <div>
        <span className='font-semibold'>STUDY</span>
        <span className='italic'>MATE</span>
      </div>
    </h2>

    <ul className='flex flex-col items-start gap-4'>
      {PATHS.map(({ name, icon }, i) => (
        <RouteButton route={name} icon={icon} key={i} />
      ))}
    </ul>
  </aside>
)

interface RouteButtonParams {
  route: string
  icon: JSX.Element
}

const RouteButton = ({ route, icon }: RouteButtonParams) => {
  const [isSelected, setIsSelected] = useState(false)
  const routeLowerCase = route.toLowerCase()
  const pathname = usePathname()

  useEffect(() => {
    const [, routeName] = pathname.split('/')
    setIsSelected(routeName === routeLowerCase)
  }, [pathname])

  const style = isSelected ? 'text-white scale-[1.1] bg-gray-10/[.04]' : 'text-gray-10 button'

  return (
    <li>
      <Link
        href={`/${routeLowerCase}`}
        className={`${style} px-6 py-3 rounded-full flex origin-left gap-3 relative items-center -translate-x-3 transition-all`}
        draggable={false}
      >
        <div className='*:size-8 *:stroke-[1.5px]'>{icon}</div>
        <span className={`text-xl font-medium ${FONTS.POPPINS}`}>{route}</span>
      </Link>
    </li>
  )
}

const PATHS = [
  {
    name: 'Dashboard',
    icon: <HomeIcon />
  },
  {
    name: 'Chat',
    icon: <MessageIcon />
  },
  {
    name: 'Studyplan',
    icon: <BookIcon />
  },
  {
    name: 'Focus',
    icon: <ClockIcon />
  },
  {
    name: 'Profile',
    icon: <ProfileIcon />
  }
]
