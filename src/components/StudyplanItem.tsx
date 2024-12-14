import { FONTS } from '@/consts'
import { useStudyplansStore } from '@/store/useStudyplansStore'
import type { Studyplan } from '@/types.d'
import { parseDays } from '@/utils/parseDays'
import Image from 'next/image'
import Link from 'next/link'
import { ClockIcon } from './icons'

export const StudyplanItem = (studyplan: Studyplan) => {
  const setStudyplan = useStudyplansStore(s => s.setStudyplan)
  const { id, name, category, daily_lessons } = studyplan

  const imageSource = `/studyplan/${category.toLowerCase().replace(' ', '-')}.webp`

  const handleClick = () => {
    setStudyplan(studyplan)
  }

  return (
    <li className='flex flex-col w-56 max-w-56 button'>
      <Link href={`/studyplan?id=${id}`} onClick={handleClick}>
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
          {parseDays(daily_lessons.length)}
        </span>
      </Link>
    </li>
  )
}
