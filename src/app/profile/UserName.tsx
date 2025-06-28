import { FallbackBox } from '@/components/FallbackBox'
import { Header } from '@components/Header'
import type { DBUserData } from '@types'

interface Props {
  profile: DBUserData | null
}

export const UserName = ({ profile }: Props) =>
  profile ? <Header size={3}>{profile?.user_name}</Header> : <FallbackBox className='w-48 h-8' />
