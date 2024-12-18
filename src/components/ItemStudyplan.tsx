import { FONTS } from '@/consts'
import { getCategoryValues } from '@/lib/utils/getCategoryValues'
import { parseDays } from '@/lib/utils/parseDays'
import type { Category } from '@/types.d'
import Image from 'next/image'
import Link from 'next/link'
import { ClockIcon } from './icons'

interface Props {
  id: string
  name: string
  category: Category
  days: number
}

export const ItemStudyplan = ({ id, name, category, days }: Props) => {
  const { image } = getCategoryValues(category)

  return (
    <li className='flex flex-col w-56 button' title={name}>
      <Link href={`/studyplan?id=${id}`}>
        <Image
          src={`/studyplan/${image}.webp`}
          alt='Studyplan category'
          width={250}
          height={200}
          className='object-cover w-full h-44 rounded-lg mb-2'
          draggable={false}
        />
        <span
          className={`
            ${FONTS.POPPINS} text-lg text-white w-full inline-block text-nowrap 
            whitespace-nowrap overflow-hidden text-ellipsis
          `}
        >
          {name}
        </span>
        <span className='flex items-center gap-1 text-gray-10 -translate-y-1'>
          <ClockIcon className='size-5' />
          {parseDays(days)}
        </span>
      </Link>
    </li>
  )
}
