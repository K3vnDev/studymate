interface Props {
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

  className?: string
  margin?: number
  size?: number
}

export const BlurredPoint = ({ className = '', margin = 5, size = 60, pos }: Props) => {
  const getPositionStyle = () => {
    const [x, y] = pos.split('-')

    const getValue = (pos: string) => {
      if (pos === 'center') {
        return 50
      }

      const rawValue = ['top', 'left'].includes(pos) ? 0 : 100
      return Math.abs(rawValue - margin)
    }

    return {
      top: `${getValue(y)}vh`,
      left: `${getValue(x)}vw`
    }
  }

  const getSize = () => ({
    width: `${size}rem`,
    height: `${size}rem`
  })

  return (
    <div
      className={`${className} absolute -translate-x-1/2 -translate-y-1/2 blur-[200px]`}
      style={{ ...getPositionStyle(), ...getSize() }}
    />
  )
}
