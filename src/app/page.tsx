import { LoginButton } from '@/components/LoginButton'
import { AppLogo } from '@components/AppLogo'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import Image from 'next/image'
import { redirect } from 'next/navigation'

export default async function Home() {
  const supabase = createServerComponentClient({ cookies })
  const auth = await supabase.auth.getUser()
  const { user } = auth.data

  if (user !== null) redirect('/dashboard')

  return (
    <main className='w-full h-screen flex flex-col items-center justify-between py-16'>
      <div className='flex flex-col items-center gap-4'>
        <Image
          src='/favicon.ico'
          alt='App Logo'
          width={300}
          height={300}
          className='size-32'
          draggable={false}
        />
        <AppLogo />
      </div>
      <LoginButton />
    </main>
  )
}
