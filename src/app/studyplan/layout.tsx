import { BGPoint, Background } from '@components/Background'

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      {children}

      <Background>
        <BGPoint margin={20} className='bg-blue-30/5' pos='left-bottom' />
        <BGPoint className='bg-blue-30/15' pos='center-top' />
        <BGPoint margin={20} className='bg-blue-30/5' pos='right-bottom' />
      </Background>
    </>
  )
}
