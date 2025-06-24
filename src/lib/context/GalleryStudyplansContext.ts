import { createContext } from 'react'

interface GalleryStudyplansContext {
  studyplansList?: string[]
  paginated: boolean
}

export const GalleryStudyplansContext = createContext<GalleryStudyplansContext>({
  studyplansList: undefined,
  paginated: false
})
