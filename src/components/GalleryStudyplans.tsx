import { CONTENT_JSON, FONTS } from '@/consts'
import { useSearchStudyplan } from '@/hooks/useSearchStudyplan'
import { dataFetch } from '@/lib/utils/dataFetch'
import { getCategoryValues } from '@/lib/utils/getCategoryValues'
import { parseDays } from '@/lib/utils/parseDays'
import { repeat } from '@/lib/utils/repeat'
import { useStudyplansStore } from '@/store/useStudyplansStore'
import { type UserStore, useUserStore } from '@/store/useUserStore'
import type { StudyplanSaved } from '@/types.d'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect } from 'react'
import { Header } from './Header'
import { ClockIcon } from './icons'

interface Props {
  title: string
  storeKey: keyof UserStore['studyplansLists']
  maxItems: number
}

export const GalleryStudyplans = ({ title, storeKey, maxItems }: Props) => {
  const studyplansLists = useUserStore(s => s.studyplansLists)
  const addStudyplans = useStudyplansStore(s => s.addStudyplans)
  const studyplans = studyplansLists[storeKey]?.slice(0, maxItems)

  useEffect(() => {
    if (!studyplansLists[storeKey]) return

    dataFetch<StudyplanSaved[]>({
      url: '/api/studyplans',
      options: {
        method: 'POST',
        headers: CONTENT_JSON,
        body: JSON.stringify(studyplansLists[storeKey])
      },
      onSuccess: data => addStudyplans(...data)
    })
  }, [studyplansLists[storeKey]])

  return (
    <section className='flex flex-col gap-4'>
      {studyplansLists[storeKey] ? (
        <Header>{title}</Header>
      ) : (
        <div className='bg-zinc-700 animate-pulse rounded-lg w-48 h-8' />
      )}
      <ul className='flex flex-wrap gap-4'>
        {studyplans
          ? studyplans.map(id => <GalleryStudyPlan key={id} id={id} />)
          : repeat(maxItems - 1, i => <GalleryStudyPlanFallback key={i} />)}
      </ul>
    </section>
  )
}

interface ViewStudyPlanProps {
  id: string
}

const GalleryStudyPlan = ({ id }: ViewStudyPlanProps) => {
  const { studyplan } = useSearchStudyplan(id)

  if (studyplan) {
    const { name, category, daily_lessons } = studyplan
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
            {parseDays(daily_lessons.length)}
          </span>
        </Link>
      </li>
    )
  }

  return <GalleryStudyPlanFallback />
}

const GalleryStudyPlanFallback = () => (
  <li className='flex flex-col w-56 gap-2 animate-pulse'>
    <div className='bg-zinc-600 w-full h-44 rounded-lg' />
    <span className='bg-zinc-700 w-full h-7 rounded-lg' />
    <span className='bg-zinc-700 w-[4.5rem] h-7 rounded-lg' />
  </li>
)
