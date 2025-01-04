import { FONTS, MATE_IMAGES_ALT } from '@/consts'
import Image from 'next/image'

interface Props {
  children?: React.ReactNode
}

export const ErrorCard = ({ children }: Props) => (
  <div className='absolute top-1/2 -translate-y-1/2 flex flex-col items-center gap-7'>
    <Image
      src='/mate/sitting.webp'
      alt={MATE_IMAGES_ALT.SITTING}
      width={172}
      height={172}
      draggable={false}
      className='saturate-[15%]'
    />

    <span className={`${FONTS.POPPINS} text-5xl font-bold text-white`}>Ooops...</span>
    {children}
  </div>
)

interface MessageProps {
  className?: string
  children?: React.ReactNode
}

export const Message = ({ className = '', children = 'Sorry, there was an error' }: MessageProps) => (
  <span className={`${FONTS.POPPINS} ${className} text-2xl text-gray-10 text-pretty text-center`}>
    {children} :(
  </span>
)

interface ButtonProps {
  className?: string
  onClick?: () => void
  children: React.ReactNode
}

export const Button = ({ className = '', children, onClick = () => {} }: ButtonProps) => (
  <button
    className={`
      ${className} border border-gray-20 bg-gray-30/25 px-5 py-2 group
      text-gray-10 text-xl flex gap-2 rounded-lg button
    `}
    {...{ onClick }}
  >
    {children}
  </button>
)
