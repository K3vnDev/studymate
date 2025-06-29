'use client'

import { GalleryStudyplans } from '@components/GalleryStudyplans/GalleryStudyplans'
import { Main } from '@components/Main'
import { InitialSection } from './InitialSection'
import { Sidebar } from '@components/Sidebar'
import { Background } from '@components/Background/Background'
import { Glow } from '@components/Background/Glow'

export default function DashboardPage() {
  return (
    <>
      <Main className='gap-12 h-full'>
        <InitialSection />

        <GalleryStudyplans
          title='Studyplans for you'
          storeKey='recommended'
          emptyMessage="Oops! We couldn't find any Studyplans for you."
        />
      </Main>
      <Sidebar />

      <Background>
        <Glow className='bg-[#6A71FC]/25' pos='left-top' />
        <Glow className='bg-[#6A71FC]/15' pos='right-bottom' />
      </Background>
    </>
  )
}
