'use client'

import { GalleryStudyplans } from '@components/GalleryStudyplans/GalleryStudyplans'
import { Main } from '@components/Main'
import { useUserData } from '@hooks/useUserData'
import { InitialSection } from './InitialSection'

export default function DashboardPage() {
  useUserData()

  return (
    <Main className='gap-12 h-full'>
      <InitialSection />

      <GalleryStudyplans title='Studyplans for you' storeKey='recomended' itemsCount={{ max: 6, min: 4 }} />
    </Main>
  )
}
