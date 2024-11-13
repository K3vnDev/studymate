'use client'

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { GithubIcon } from './icons'

export const LoginButton = () => {
  const supabase = createClientComponentClient()

  const handleSignIn = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'github',
      options: { redirectTo: `${location.origin}/auth/callback` }
    })
  }

  return (
    <button
      onClick={handleSignIn}
      className='bg-black border border-[#333] rounded-full px-8 py-3 flex gap-3 items-center hover:scale-105 active:scale-95 transition hover:brightness-125 active:brightness-90'
    >
      <GithubIcon className='size-6' />
      <span className='text-white'>Sign in with Github</span>
    </button>
  )
}
