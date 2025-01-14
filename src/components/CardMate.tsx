import { MATE_IMAGES_ALT } from '@/consts'
import { useUserPrompts } from '@/hooks/useUserPrompts'
import Image from 'next/image'
import { Paragraph } from './Paragraph'

interface Props {
  message: string
  children?: React.ReactNode
  className?: {
    main?: string
    image?: string
  }
  onClick?: () => void
}

export const CardMate = ({ message, children, onClick, className }: Props) => {
  const prompts = useUserPrompts({ redirect: true })

  return (
    <article
      className={`
        ${className?.main ?? ''} bg-card-background border border-card-border w-fit max-w-[40rem] 
        rounded-2xl flex items-center px-8 gap-4 card
      `}
      onClick={onClick ?? prompts.blank}
    >
      <div className='h-full min-w-40 self-end aspect-square'>
        <Image
          src='/mate/greeting.webp'
          alt={MATE_IMAGES_ALT.GREETING}
          draggable={false}
          width={150}
          height={150}
          className={`${className?.image ?? ''} h-full [scale:1.15] object-cover self-end origin-bottom`}
        />
      </div>

      <main className='flex flex-col gap-5 py-5'>
        <Paragraph>{message}</Paragraph>
        <div className='flex gap-2 self-end'>{children}</div>
      </main>
    </article>
  )
}
