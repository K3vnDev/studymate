import { FONTS } from '@/consts'

export const Timer = () => {
  return (
    <div className='size-80 flex justify-center items-center relative'>
      <span className={`${FONTS.INTER} text-white text-6xl font-semibold`}>26:17</span>
      <div
        className={`
          absolute left-0 top-0 w-full aspect-square border-[4px] border-blue-10/10 rounded-full 
          shadow-circle shadow-blue-10/15 animate-pulse
        `}
      />
    </div>
  )
}
