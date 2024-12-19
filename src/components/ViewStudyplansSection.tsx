import { FONTS } from '@/consts'
import { dataFetch } from '@/lib/utils/dataFetch'
import { getCategoryValues } from '@/lib/utils/getCategoryValues'
import { parseDays } from '@/lib/utils/parseDays'
import { repeat } from '@/lib/utils/repeat'
import { type StudyplansStore, useStudyplansStore } from '@/store/useStudyplansStore'
import type { Category, StudyplanSaved } from '@/types.d'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect } from 'react'
import { Header } from './Header'
import { ClockIcon } from './icons'

interface Props {
  title: string
  storeKey: keyof StudyplansStore['studyplans']
  maxItems: number
}

export const ViewStudyplansSection = ({ title, storeKey, maxItems }: Props) => {
  const setStoreStudyplans = useStudyplansStore(s => s.setStudyplans)
  const storeStudyplans = useStudyplansStore(s => s.studyplans[storeKey])

  useEffect(() => {
    if (storeStudyplans.length) {
      return
    }

    dataFetch<StudyplanSaved[]>({
      url: '/api/studyplans',
      onSuccess: data => {
        setStoreStudyplans(storeKey, data)
      }
    })
  }, [])

  return (
    <section className='flex flex-col gap-4'>
      <Header>{title}</Header>
      <ul className='flex flex-wrap gap-4'>
        {storeStudyplans.length > 0
          ? storeStudyplans.map(({ daily_lessons, created_by, desc, ...studyplan }) => (
              <ViewStudyPlan key={studyplan.id} {...{ ...studyplan, days: daily_lessons.length }} />
            ))
          : repeat(maxItems, i => <ViewStudyPlanFallback key={i} />)}
      </ul>
    </section>
  )
}

interface ViewStudyPlanProps {
  id: string
  name: string
  category: Category
  days: number
}

const ViewStudyPlan = ({ id, name, category, days }: ViewStudyPlanProps) => {
  const { image } = getCategoryValues(category)

  return (
    <li className='flex flex-col w-56 button' title={name}>
      <Link href={`/studyplan/${id}`}>
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
            whitespace-nowrap overflow-hidden text-ellipsis h-7
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

const ViewStudyPlanFallback = () => (
  <li className='flex flex-col w-56 gap-2 animate-pulse'>
    <div className='bg-zinc-600 w-full h-44 rounded-lg' />
    <span className='bg-zinc-700 w-full h-7 rounded-lg' />
    <span className='bg-zinc-700 w-[4.5rem] h-7 rounded-lg' />
  </li>
)
