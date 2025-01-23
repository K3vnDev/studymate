import { BGPoint, Background } from '@components/Background'
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
        <BGPoint className='bg-[#6A71FC]/15' pos='left-top' />
        <BGPoint className='bg-[#6313ED]/10' pos='center-center' />
        <BGPoint className='bg-[#6A71FC]/15' pos='right-bottom' />
      </Background>
    </>
  )
}
