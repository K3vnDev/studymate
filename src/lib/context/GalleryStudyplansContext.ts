import { createContext } from 'react'

interface GalleryStudyplansContext {
  studyplansList?: string[]
  carousel: boolean
}

export const GalleryStudyplansContext = createContext<GalleryStudyplansContext>({
  studyplansList: undefined,
  carousel: false
})
