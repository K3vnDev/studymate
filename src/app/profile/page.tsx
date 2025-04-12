'use client'

import { Header } from '@/components/Header'
import { Main } from '@/components/Main'
import { Paragraph } from '@/components/Paragraph'
import { Sidebar } from '@/components/Sidebar'
import { useUserData } from '@/hooks/useUserData'
import Image from 'next/image'

export default function ProfilePage() {
  const { profile } = useUserData()
  const imageSize = 128

  return (
    <>
      <Main>
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
              <Header>{profile.user_name}</Header>
              <Paragraph>Your id is {profile.id}</Paragraph>
            </div>
          </article>
        )}
      </Main>
      <Sidebar />
    </>
  )
}
