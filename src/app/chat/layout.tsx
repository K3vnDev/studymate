import { Background } from '@components/Background/Background'
import { BlurredPoint } from '@components/Background/BlurredPoint'
import { Sidebar } from '@components/Sidebar'

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      {children}

      <Sidebar />

      <Background className='bg-[#020202]'>
        <BlurredPoint className='bg-[#6A71FC]/15' pos='left-top' />
        <BlurredPoint className='bg-[#6313ED]/10' pos='center-center' />
        <BlurredPoint className='bg-[#6A71FC]/15' pos='right-bottom' />
      </Background>
    </>
  )
}
