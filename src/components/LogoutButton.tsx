'use client'

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useRouter } from 'next/navigation'

export const LogoutButton = () => {
  const supabase = createClientComponentClient()
  const router = useRouter()

  const handleClick = () => {
    supabase.auth.signOut()
    router.push('/')
  }

  return (
    <button onClick={handleClick} className='text-white border border-white'>
      Logout
    </button>
  )
}
