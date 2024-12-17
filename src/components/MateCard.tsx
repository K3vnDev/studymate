'use client'

import Image from 'next/image'
import { Paragraph } from './Paragraph'

interface Props {
  message: string
  children?: React.ReactNode
  className?: string
  onClick?: () => void
}

export const MateCard = ({ message, children, onClick, className = '' }: Props) => (
  <article
    className={`
      ${className} bg-card-background border border-card-border w-fit max-w-[40rem] 
      rounded-2xl flex items-center px-8 gap-4 card
    `}
    onClick={onClick}
  >
    <div className='h-full min-w-40'>
      <Image
        src='/mate-image.webp'
        alt='Your virtual assistant, Mate, waving its hand at you'
        width={150}
        height={150}
        className='h-full scale-[1.15] object-cover self-end origin-bottom'
      />
    </div>

    <main className='flex flex-col gap-5 py-5'>
      <Paragraph>{message}</Paragraph>
      <div className='flex gap-2 self-end'>{children}</div>
    </main>
  </article>
)
