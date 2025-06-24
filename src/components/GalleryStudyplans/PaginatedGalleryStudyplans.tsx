import { SCREENS } from '@consts'
import { useResponsiveness } from '@/hooks/useResponsiveness'
import { GalleryStudyplansContext } from '@/lib/context/GalleryStudyplansContext'
import { useContext, useRef } from 'react'
import { TileStudyPlanFallback } from './TileStudyplanFallback'
import { repeat } from '@/lib/utils/repeat'
import { TileStudyplan } from './TileStudyplan'

export const PaginatedGalleryStudyplans = () => {
  const { studyplansList } = useContext(GalleryStudyplansContext)
  const { screenSize } = useResponsiveness()
  const ulRef = useRef<HTMLUListElement>(null)

  const showItemsCount = screenSize.x >= SCREENS.MD ? 3 : 2

  const tileWidth = (() => {
    if (!ulRef.current) return
    const { offsetWidth } = ulRef.current

    const totalGap = 16 * (showItemsCount - 1)
    const width = (offsetWidth - totalGap) / showItemsCount
    return `${width}px`
  })()

  const tileProps = {
    className: 'shrink-0',
    style: { width: tileWidth, maxWidth: tileWidth, minWidth: tileWidth }
  }

  return (
    <ul
      ref={ulRef}
      className='flex gap-4 overflow-x-clip w-full max-w-full'
      style={{ contain: 'layout inline-size' }}
    >
      {tileWidth && studyplansList
        ? studyplansList.map(id => <TileStudyplan key={id} id={id} {...tileProps} />)
        : repeat(showItemsCount, i => <TileStudyPlanFallback key={i} {...tileProps} />)}
    </ul>
  )
}
