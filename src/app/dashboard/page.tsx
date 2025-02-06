'use client'

import { GalleryStudyplans } from '@components/GalleryStudyplans'
import { Main } from '@components/Main'
import { useUserData } from '@hooks/useUserData'
import { InitialSection } from './InitialSection'

export default function DashboardPage() {
  useUserData()

  return (
    <Main className='gap-12 h-full'>
      <InitialSection />

      <GalleryStudyplans title='Studyplans for you' storeKey='recomended' maxItems={6} />
    </Main>
  )
}
