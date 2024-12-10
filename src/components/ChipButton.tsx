interface Props {
  children: React.ReactNode
  empty?: boolean
}

export const ChipButton = ({ children, empty }: Props) => {
  const style: React.CSSProperties = empty
    ? { background: 'transparent', borderColor: '#CED1FF', color: '#CED1FF' }
    : { background: '#1820B4', borderColor: '#6168E8', color: '#FFF' }

  return (
    <button className='border rounded-full py-1 px-6 font-medium text-lg button' style={style}>
      {children}
    </button>
  )
}
