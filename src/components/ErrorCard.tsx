import { FONTS } from '@/consts'

interface Props {
  children?: React.ReactNode
}

// TODO: Redesign this
export const ErrorCard = ({ children = 'Sorry there was an error :(' }: Props) => {
  return (
    <div className='error px-8 py-4 text-lg rounded-md absolute top-1/2 -translate-y-1/2 max-w-96 flex flex-col gap-2'>
      <span className={`${FONTS.INTER}`}>{children}</span>
      <small>This message is temporary</small>
    </div>
  )
}
