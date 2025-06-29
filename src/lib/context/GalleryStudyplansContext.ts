import { createContext } from 'react'

interface GalleryStudyplansContext {
  studyplansList?: string[]
  carousel: boolean
  gap: number
  emptyMessage: string
  title: string
}

export const GalleryStudyplansContext = createContext<GalleryStudyplansContext>({
  title: '',
  studyplansList: undefined,
  carousel: false,
  gap: 16,
  emptyMessage: ''
})
