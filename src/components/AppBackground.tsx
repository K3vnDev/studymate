interface Props {
  children: React.ReactNode
}

export const AppBackground = ({ children }: Props) => (
  <div className='bg-[#0C0C0C] fixed top-0 left-0 w-screen h-screen -z-10 pointer-events-none overflow-hidden'>
    {children}
  </div>
)

interface BlurredPointProps {
  position:
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

export const BlurredPoint = ({ className = '', margin = 5, size = 60, position }: BlurredPointProps) => {
  const getPositionStyle = () => {
    const [x, y] = position.split('-')

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
