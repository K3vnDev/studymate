'use client'

import { dataFetch } from '@/lib/utils/dataFetch'
import { useStudyplansStore } from '@/store/useStudyplansStore'
import type { UserStore } from '@/store/useUserStore'
import { Header } from '@components/Header'
import { CONTENT_JSON } from '@consts'
import type { StudyplanSaved } from '@types'
import { useEffect } from 'react'
import { useUserData } from '@/hooks/useUserData'
import { GalleryStudyplansContext } from '@/lib/context/GalleryStudyplansContext'
import { RowsGalleryStudyplans } from './RowsGalleryStudyplans'
import { CarouselGalleryStudyplans } from './CarouselGalleryStudyplans'

interface Props {
  title: string
  storeKey: keyof UserStore['studyplansLists']
  carousel?: boolean
}

/**
 * A component that renders a gallery of studyplans.
 *
 * It already handles the fetching of the studyplans data from the server.
 *
 * It allows to render the studyplans in a carousel or in a 2 rows layout.
 *
 * @param {Props} props - The props for the GalleryStudyplans component.
 * @param {string} props.title - The title of the gallery.
 * @param {keyof UserStore['studyplansLists']} props.storeKey - The key of the studyplans list in the user store.
 * @param {boolean} [props.carousel=false] - Whether to render the studyplans in a carousel or not.
 */
export const GalleryStudyplans = ({ title, storeKey, carousel = false }: Props) => {
  const addStudyplans = useStudyplansStore(s => s.addStudyplans)
  const { lists: studyplansLists } = useUserData()
  const studyplansList = studyplansLists[storeKey]

  useEffect(() => {
    if (!studyplansList) return

    dataFetch<StudyplanSaved[]>({
      url: '/api/studyplans',
      options: {
        method: 'POST',
        headers: CONTENT_JSON,
        body: JSON.stringify(studyplansList)
      },
      onSuccess: data => addStudyplans(...data)
    })
  }, [studyplansList])

  return (
    <GalleryStudyplansContext.Provider value={{ studyplansList, carousel }}>
      <section className='flex flex-col gap-4'>
        {/* Render the title if the studyplans list is not empty, otherwise render a placeholder */}
        {studyplansList ? (
          <Header>{title}</Header>
        ) : (
          <div className='bg-zinc-700 animate-pulse rounded-lg w-48 h-8' />
        )}

        {/* Render the correct component based on the paginated prop */}
        {carousel ? <CarouselGalleryStudyplans /> : <RowsGalleryStudyplans />}
      </section>
    </GalleryStudyplansContext.Provider>
  )
}
