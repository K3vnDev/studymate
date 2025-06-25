import { SCREENS } from '@consts'
import { useResponsiveness } from '@hooks/useResponsiveness'
import { GalleryStudyplansContext } from '@/lib/context/GalleryStudyplansContext'
import { useContext, useEffect, useRef, useState } from 'react'
import { TileStudyPlanFallback } from './TileStudyplanFallback'
import { repeat } from '@/lib/utils/repeat'
import { TileStudyplan } from './TileStudyplan'

export const CarouselGalleryStudyplans = () => {
  const { studyplansList } = useContext(GalleryStudyplansContext)
  const { screenSize, loaded } = useResponsiveness()

  const ulRef = useRef<HTMLUListElement>(null)
  const [tileWidth, setTileWidth] = useState<string | undefined>()

  const showItemsCount = screenSize.x >= SCREENS.MD ? 3 : 2

  useEffect(() => {
    if (ulRef.current && loaded) {
      // Calculate the width of the tile based on the screen size
      const { offsetWidth } = ulRef.current
      const totalGap = 16 * (showItemsCount - 1)
      const width = (offsetWidth - totalGap) / showItemsCount
      setTileWidth(`${width}px`)
    }
  }, [screenSize.x, loaded])

  const tileProps = {
    className: 'shrink-0',
    style: {
      width: tileWidth,
      maxWidth: tileWidth,
      minWidth: tileWidth
    }
  }

  return (
    <ul
      ref={ulRef}
      className='flex gap-4 overflow-x-clip w-full max-w-full'
      style={{ contain: 'layout inline-size' }}
    >
      {loaded &&
        (tileWidth && studyplansList
          ? studyplansList.map(id => <TileStudyplan key={id} id={id} {...tileProps} />)
          : repeat(showItemsCount, i => <TileStudyPlanFallback key={i} {...tileProps} />))}
    </ul>
  )
}
