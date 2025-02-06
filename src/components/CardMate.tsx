import { Paragraph } from '@components/Paragraph'
import { MATE_IMAGES_ALT } from '@consts'
import { useUserPrompts } from '@hooks/useUserPrompts'
import Image from 'next/image'

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
        ${className?.main ?? ''} bg-card-background border border-card-border w-fit lg:max-w-[40rem] max-w-[34rem]
        rounded-2xl flex items-center sm:px-8 px-6 gap-6 card
      `}
      onClick={onClick ?? prompts.blank}
    >
      <div className='self-end'>
        <Image
          src='/mate/greeting.webp'
          alt={MATE_IMAGES_ALT.GREETING}
          draggable={false}
          width={160}
          height={150}
          className={`
            ${className?.image ?? ''} [scale:1.15] object-cover self-end origin-bottom
            max-w-40 xs:w-40 w-28 aspect-square
          `}
        />
      </div>

      <main className='flex flex-col sm:gap-5 gap-3 xs:py-7 py-4'>
        <Paragraph>{message}</Paragraph>
        <div className='flex gap-2 self-end'>{children}</div>
      </main>
    </article>
  )
}
