import type { ReusableComponent } from '@types'
import { twMerge } from 'tailwind-merge'

type Props = {
  pos:
    | 'left-top'
    | 'center-top'
    | 'right-top'
    | 'left-center'
    | 'center-center'
    | 'right-center'
    | 'left-bottom'
    | 'center-bottom'
    | 'right-bottom'

  margin?: number
  size?: number
} & ReusableComponent

export const Glow = ({ className = '', style, margin = 5, size = 60, pos }: Props) => {
  const SIZE_FACTOR = 0.7

  const getPositionStyle = (): React.CSSProperties => {
    const [x, y] = pos.split('-')

    const getValue = (pos: string) => {
      if (pos === 'center') return 50

      const rawValue = ['top', 'left'].includes(pos) ? 0 : 100
      return Math.abs(rawValue - margin)
    }

    return {
      top: `${getValue(y)}vh`,
      left: `${getValue(x)}vw`
    }
  }

  const getSize = (): React.CSSProperties => {
    const sz = `calc(${size * SIZE_FACTOR}rem + 35vw)`
    return { width: sz, height: sz }
  }

  return (
    <div
      className={twMerge(`
        absolute -translate-x-1/2 -translate-y-1/2 blur-[200px]
        aspect-square ${className}
      `)}
      style={{ ...getPositionStyle(), ...getSize(), ...style }}
    />
  )
}
