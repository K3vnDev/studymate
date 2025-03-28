import { GalleryStudyplans } from '@/components/GalleryStudyplans/GalleryStudyplans'
import { Header } from '@/components/Header'
import { Paragraph } from '@/components/Paragraph'
import { Background, BGPoint } from '@components/Background'
import { Main } from '@components/Main'
import { Sidebar } from '@components/Sidebar'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import Image from 'next/image'

interface User {
  avatar_url: string
  user_name: string
}

export default async function ProfilePage() {
  // TODO: Move this inside useUserData()
  const supabase = createServerComponentClient({ cookies })
  const response = await supabase.from('users').select('*')
  const [user] = response.data as User[]

  console.log(user)

  const imageSize = 120

  return (
    <>
      <Main className='gap-12'>
        <div className='flex items-center gap-8'>
          <Image
            src={user.avatar_url}
            alt='User avatar'
            width={imageSize}
            height={imageSize}
            className='rounded-full'
          />
          <div>
            <Header>{user.user_name}</Header>
            <Paragraph>Hello wrld</Paragraph>
          </div>
        </div>
        <GalleryStudyplans title='Completed' storeKey='completed' itemsCount={{ max: 6, min: 3 }} />
        <GalleryStudyplans title='Saved' storeKey='saved' itemsCount={{ max: 6, min: 3 }} />
      </Main>

      <Sidebar />
      <Background>
        <BGPoint className='bg-[#27548A]/25' pos='right-bottom' margin={10} />
        <BGPoint className='bg-[#8F87F1]/15' pos='left-top' margin={20} />
      </Background>
    </>
  )
}
