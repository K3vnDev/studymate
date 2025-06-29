import { FlameIcon } from '@icons'
import { Paragraph } from '@components/Paragraph'
import { useUserData } from '@hooks/useUserData'
import { Achievements } from './Achievements'
import { UserImage } from './UserImage'
import { UserName } from './UserName'
import { OptionsButton } from './OptionsButton'

export const UserSection = () => {
  const { profile } = useUserData()

  return (
    <section className='flex flex-col gap-6 relative'>
      <article className='flex lg:gap-8 sm:gap-6 gap-4 w-full'>
        <UserImage profile={profile} />
        <div className='self-center flex flex-col gap-1'>
          <UserName profile={profile} />
          <Paragraph className='flex items-center gap-1'>
            <FlameIcon className='min-w-8 size-8 text-blue-20' /> Your max streak will appear here.
          </Paragraph>
        </div>
      </article>
      <Achievements />

      <OptionsButton />
    </section>
  )
}
