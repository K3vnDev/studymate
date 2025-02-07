import { getCategoryValues } from '@/lib/utils/getCategoryValues'
import { parseDays } from '@/lib/utils/parseDays'
import { FONTS } from '@consts'
import { useSearchStudyplan } from '@hooks/useSearchStudyplan'
import { ClockIcon } from '@icons'
import Image from 'next/image'
import Link from 'next/link'
import { TileStudyPlanFallback } from './TileStudyplanFallback'

interface Props {
  id: string
}

export const TileStudyplan = ({ id }: Props) => {
  const { studyplan } = useSearchStudyplan(id)

  if (studyplan) {
    const { name, category, daily_lessons } = studyplan
    const { image } = getCategoryValues(category)

    return (
      <li className='flex flex-col w-full button' title={name}>
        <Link href={`/studyplan/${id}`}>
          <Image
            src={`/studyplan/${image}.webp`}
            alt='Studyplan category'
            width={250}
            height={200}
            className='object-cover w-full h-[11.5rem] rounded-lg mb-2'
            draggable={false}
          />
          <span
            className={`
              ${FONTS.POPPINS} text-lg text-white w-full inline-block text-nowrap 
              whitespace-nowrap overflow-hidden text-ellipsis h-7
            `}
          >
            {name}
          </span>
          <span className='flex items-center gap-1 text-gray-10 -translate-y-1'>
            <ClockIcon className='size-5' />
            {parseDays(daily_lessons.length)}
          </span>
        </Link>
      </li>
    )
  }

  return <TileStudyPlanFallback />
}
