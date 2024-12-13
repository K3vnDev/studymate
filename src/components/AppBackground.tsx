export const AppBackground = () => {
  return (
    <div className='bg-[#0C0C0C] fixed top-0 left-0 w-screen h-screen -z-10 pointer-events-none overflow-hidden'>
      <BlurredPoint className='bg-[#6A71FC] top-0 left-0 opacity-[0.19]' />
      <BlurredPoint className='bg-[#6313ED] top-[100vh] left-[100vw] opacity-[0.13]' />
    </div>
  )
}

const BlurredPoint = ({ className = '' }) => (
  <div
    className={`absolute -translate-x-1/2 -translate-y-1/2 size-[53rem] blur-[200px] ${className}`}
  />
)
