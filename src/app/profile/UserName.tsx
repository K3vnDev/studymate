import { FallbackBox } from '@/components/FallbackBox'
import { Header } from '@components/Header'
import type { DBUserData } from '@types'

interface Props {
  profile: DBUserData | null
}

export const UserName = ({ profile }: Props) =>
  profile ? (
    <Header
      className={`
        inline-block overflow-hidden whitespace-nowrap text-ellipsis
        md:max-w-xs xs:max-w-56 max-w-40 
      `}
      size={3}
    >
      {profile.user_name}
    </Header>
  ) : (
    <FallbackBox className='xs:w-48 w-32 h-8' />
  )
