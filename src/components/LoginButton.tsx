'use client'

import { GithubIcon } from '@icons'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

export const LoginButton = () => {
  const supabase = createClientComponentClient()

  const handleSignIn = async () => {
    if (typeof window === 'undefined') return

    await supabase.auth.signInWithOAuth({
      provider: 'github',
      options: { redirectTo: `${window.location.origin}/auth/callback` }
    })
  }

  return (
    <button
      onClick={handleSignIn}
      className='bg-black border border-[#333] rounded-full px-8 py-3 flex gap-3 items-center button'
    >
      <GithubIcon className='size-6' />
      <span className='text-white'>Sign in with Github</span>
    </button>
  )
}
