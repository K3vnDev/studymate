import { ChipButton } from '@components/ChipButton'
import Image from 'next/image'

export const MateCard = () => {
  return (
    <div className='card-bg border card-border max-w-xl w-full rounded-2xl flex items-center overflow-hidden px-8 gap-4'>
      <Image
        src='/mate-image.webp'
        alt='Your virtual assistant, Mate, waving its hand at you'
        width={150}
        height={150}
        className='h-full w-40 object-cover self-end'
      />
      <main className='flex flex-col items-end gap-5 py-5'>
        <span className='text-[#CCCCCC] w-full'>
          Hey there! I'm Mate. I'll be helping you out with everything you need.
        </span>
        <div className='flex gap-2'>
          <ChipButton empty>Button</ChipButton>
          <ChipButton>Button</ChipButton>
        </div>
      </main>
    </div>
  )
}
