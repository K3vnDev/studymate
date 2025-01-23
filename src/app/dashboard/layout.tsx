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

      <Background>
        <BGPoint className='bg-[#6A71FC]/25' pos='left-top' />
        <BGPoint className='bg-[#6A71FC]/15' pos='right-bottom' />
      </Background>
    </>
  )
}
