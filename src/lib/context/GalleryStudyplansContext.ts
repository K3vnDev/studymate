import { createContext } from 'react'

interface GalleryStudyplansContext {
  studyplansList?: string[]
  carousel: boolean
  gap: number
}

export const GalleryStudyplansContext = createContext<GalleryStudyplansContext>({
  studyplansList: undefined,
  carousel: false,
  gap: 16
})
