'use client'

import { FONTS } from '@consts'
import { AppIcon, BookIcon, ClockIcon, HomeIcon, MessageIcon, ProfileIcon } from '@icons'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

export const Sidebar = () => (
  <aside
    className={`
      xl:w-[22vw] flex xl:flex-col gap-16 justify-center items-start fixed 
      3xl:left-48 2xl:left-32 xl:left-16 left-1/2 xl:top-1/2 top-4 
      xl:bg-transparent bg-black/50 xl:backdrop-blur-0 backdrop-blur-sm xl:border-none border border-card-border
      xl:-translate-y-1/2 xl:translate-x-0 -translate-x-1/2 rounded-full xl:px-0 px-8 xl:py-0 py-2 
    `}
  >
    <h2 className={`text-white text-3xl xl:flex hidden gap-5 items-center ml-4 ${FONTS.POPPINS}`}>
      <AppIcon width={40} height={40} className='size-10' />
      <div>
        <span className='font-semibold'>STUDY</span>
        <span className='italic'>MATE</span>
      </div>
    </h2>

    <ul className='flex xl:flex-col items-start xl:gap-4 gap-6'>
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

  const style = isSelected
    ? 'text-white xl:scale-[1.1] scale-[1.15] xl:bg-gray-10/[.04] bg-gray-10/[.1]'
    : 'text-gray-10 button'

  return (
    <li>
      <Link
        href={`/${routeLowerCase}`}
        className={`
          ${style} xl:px-6 xl:py-3 px-3 py-2 rounded-full flex xl:origin-left gap-3 relative 
          items-center xl:-translate-x-3 transition-all
        `}
        draggable={false}
      >
        <div className='*:size-8 *:stroke-[1.5px]'>{icon}</div>
        <span className={`xl:inline-block hidden text-xl font-medium ${FONTS.POPPINS}`}>{route}</span>
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
