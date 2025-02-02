import { FONTS } from '@consts'
import { AppIcon } from '@icons'

export const Header = () => (
  <div
    className={`
      ${FONTS.POPPINS} flex gap-3 items-center text-white absolute xl:top-8 sm:top-4 top-3 left-1/2 -translate-x-1/2
      backdrop-blur-lg rounded-full md:px-16 md:py-3 px-8 py-1 bg-black/35 z-10 border border-white/5
    `}
  >
    <AppIcon className='md:size-8 size-6' />
    <h3 className='font-medium md:text-3xl text-2xl'>MATE</h3>
  </div>
)
