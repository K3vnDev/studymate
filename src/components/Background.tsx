interface Props {
  children: React.ReactNode
  className?: string
}

export const Background = ({ children, className = 'bg-[#0C0C0C]' }: Props) => (
  <div
    className={`${className} fixed top-0 left-0 w-screen h-screen -z-10 pointer-events-none overflow-hidden`}
  >
    {children}
  </div>
)

interface BlurredPointProps {
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

export const BGPoint = ({ className = '', margin = 5, size = 60, pos }: BlurredPointProps) => {
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
