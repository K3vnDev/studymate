import { FONTS } from '@/consts'
import type { Studyplan } from '@/types.d'
import Image from 'next/image'
import { ClockIcon } from './icons'

export const StudyplanItem = ({ name, category, duration }: Studyplan) => {
  const imageSource = `/studyplan/${category.toLowerCase().replace(' ', '-')}.webp`
  const durationLabel = `${duration} day${duration === 1 ? '' : 's'}`

  return (
    <li className='flex flex-col w-56 max-w-56'>
      <Image
        src={imageSource}
        alt='Studyplan category'
        width={250}
        height={200}
        className='object-cover w-full h-44 rounded-lg mb-2'
        draggable={false}
      />
      <span
        className={`${FONTS.POPPINS} text-lg font-normal text-white text-ellipsis overflow-hidden text-nowrap`}
      >
        {name}
      </span>
      <span className='flex items-center gap-1 text-[#CCCCCC]'>
        <ClockIcon className='size-5' />
        {durationLabel}
      </span>
    </li>
  )
}
