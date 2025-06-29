'use client'

import { DropdownMenu } from '@/components/DropdownMenu/DropdownMenu'
import { Option } from '@/components/DropdownMenu/Option'
import { LogOutIcon } from '@/components/icons'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useRouter } from 'next/navigation'

export const OptionsButton = () => {
  const supabase = createClientComponentClient()
  const router = useRouter()

  const logOut = async () => {
    await supabase.auth.signOut()
    router.push('/')
  }

  return (
    <DropdownMenu className={{ main: 'absolute right-0 top-0' }}>
      <Option action={logOut} danger>
        <LogOutIcon />
        Log Out
      </Option>
    </DropdownMenu>
  )
}
