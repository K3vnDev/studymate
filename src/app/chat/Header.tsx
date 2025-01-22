import { FONTS } from '@consts'
import { AppIcon } from '@icons'

export const Header = () => (
  <div
    className={`
        ${FONTS.POPPINS} flex gap-3 items-center text-white absolute top-8 left-1/2 -translate-x-1/2 h-14 
        backdrop-blur-lg rounded-full px-16 bg-black/35 z-10
      `}
  >
    <AppIcon className='size-8' />
    <h3 className='font-medium text-3xl'>MATE</h3>
  </div>
)
