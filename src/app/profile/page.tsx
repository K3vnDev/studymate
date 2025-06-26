'use client'

import { Header } from '@components/Header'
import { Main } from '@components/Main'
import { Sidebar } from '@components/Sidebar'
import { useUserData } from '@/hooks/useUserData'
import Image from 'next/image'
import { Achievements } from './Achievements'
import { GalleryStudyplans } from '@components/GalleryStudyplans/GalleryStudyplans'
import { Paragraph } from '@components/Paragraph'
import { FlameIcon } from '@icons'

export default function ProfilePage() {
  const { profile } = useUserData()
  const imageSize = 128

  return (
    <>
      <Main className='flex flex-col gap-16'>
        <section className='flex flex-col gap-6'>
          {profile?.avatar_url && (
            <article className='flex gap-8 w-full'>
              <Image
                src={profile.avatar_url}
                alt='The profile avatar of the user'
                width={imageSize}
                height={imageSize}
                className='rounded-full'
              />
              <div className='self-center flex flex-col gap-1'>
                <Header size={3}>{profile.user_name}</Header>
                <Paragraph className='flex items-center gap-1'>
                  <FlameIcon className='size-8 text-blue-20' /> Your max streak will appear here.
                </Paragraph>
              </div>
            </article>
          )}
          <Achievements />
        </section>
        <GalleryStudyplans title='Your saved Studyplans' storeKey='saved' carousel />
        <GalleryStudyplans title='Your completed Studyplans' storeKey='completed' carousel />
      </Main>
      <Sidebar />
    </>
  )
}
