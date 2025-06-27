import { Header } from '@components/Header'
import { FlameIcon } from '@icons'
import { Paragraph } from '@components/Paragraph'
import { useUserData } from '@hooks/useUserData'
import Image from 'next/image'
import { Achievements } from './Achievements'

export const UserSection = () => {
  const { profile } = useUserData()
  const imageSize = 128

  return (
    <section className='flex flex-col gap-6'>
      {profile?.avatar_url && (
        <article className='flex lg:gap-8 sm:gap-6 gap-4 w-full'>
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
              <FlameIcon className='min-w-8 size-8 text-blue-20' /> Your max streak will appear here.
            </Paragraph>
          </div>
        </article>
      )}
      <Achievements />
    </section>
  )
}
