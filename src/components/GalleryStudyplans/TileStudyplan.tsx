import { getCategoryValues } from '@/lib/utils/getCategoryValues'
import { parseDays } from '@/lib/utils/parseDays'
import { FONTS } from '@consts'
import { useSearchStudyplan } from '@hooks/useSearchStudyplan'
import { ClockIcon } from '@icons'
import Image from 'next/image'
import Link from 'next/link'
import { TileStudyPlanFallback } from './TileStudyplanFallback'
import { useEffect, useRef } from 'react'

interface Props {
  className?: string
  style?: React.CSSProperties
  id: string
  inCarousel?: boolean
}

export const TileStudyplan = ({ id, className = '', style, inCarousel }: Props) => {
  const { studyplan } = useSearchStudyplan(id)
  const elementRef = useRef<HTMLLIElement>(null)
  const initialScroll = useRef(true)

  useEffect(() => {
    if (elementRef.current && initialScroll.current && inCarousel) {
      initialScroll.current = false

      const { parentElement } = elementRef.current
      parentElement?.scrollTo({ left: 0, behavior: 'smooth' })
    }
  }, [elementRef.current])

  if (studyplan) {
    const { name, category, daily_lessons } = studyplan
    const { image } = getCategoryValues(category)

    return (
      <li ref={elementRef} className={`flex flex-col w-full button ${className}`} title={name} style={style}>
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

  return <TileStudyPlanFallback style={style} />
}
