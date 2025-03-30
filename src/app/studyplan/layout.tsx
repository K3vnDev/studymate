import { Background } from '@components/Background/Background'
import { BlurredPoint } from '@components/Background/BlurredPoint'

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      {children}

      <Background>
        <BlurredPoint margin={20} className='bg-blue-30/5' pos='left-bottom' />
        <BlurredPoint className='bg-blue-30/15' pos='center-top' />
        <BlurredPoint margin={20} className='bg-blue-30/5' pos='right-bottom' />
      </Background>
    </>
  )
}
