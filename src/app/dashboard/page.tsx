'use client'

import { GalleryStudyplans } from '@components/GalleryStudyplans/GalleryStudyplans'
import { Main } from '@components/Main'
import { InitialSection } from './InitialSection'
import { Sidebar } from '@/components/Sidebar'
import { Background } from '@components/Background/Background'
import { BlurredPoint } from '@components/Background/BlurredPoint'

export default function DashboardPage() {
  return (
    <>
      <Main className='gap-12 h-full'>
        <InitialSection />

        <GalleryStudyplans
          title='Studyplans for you'
          storeKey='recommended'
          itemsCount={{ max: 6, min: 4 }}
        />
      </Main>
      <Sidebar />

      <Background>
        <BlurredPoint className='bg-[#6A71FC]/25' pos='left-top' />
        <BlurredPoint className='bg-[#6A71FC]/15' pos='right-bottom' />
      </Background>
    </>
  )
}
