import type { Metadata } from 'next'
import './globals.css'
import { Alert } from '@components/Alert'

export const metadata: Metadata = {
  title: 'Studymate',
  description: ''
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <body
        className={`
          min-h-screen 3xl:px-48 2xl:px-32 xl:px-16 lg:px-32 sm:px-8 xs:px-4 px-2 grid 
          overflow-y-scroll bg-black py-6 xl:mt-0 sm:mt-16 mt-14
        `}
      >
        {children}
        <Alert />
      </body>
    </html>
  )
}
