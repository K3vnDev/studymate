'use client'

import { Main } from '@components/Main'
import { Sidebar } from '@components/Sidebar'
import { GalleryStudyplans } from '@components/GalleryStudyplans/GalleryStudyplans'
import { UserSection } from './UserSection'

export default function ProfilePage() {
  return (
    <>
      <Main className='flex flex-col gap-16'>
        <UserSection />

        <GalleryStudyplans
          title='Your saved Studyplans'
          storeKey='saved'
          emptyMessage='Looks a little empty... Start saving some Studyplans! 😌'
          carousel
        />
        <GalleryStudyplans
          title='Your completed Studyplans'
          storeKey='completed'
          emptyMessage='Complete Studyplans and show them off here. Make this place proud! 🎉'
          carousel
        />
      </Main>
      <Sidebar />
    </>
  )
}
