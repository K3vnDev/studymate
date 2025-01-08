import type { Metadata } from 'next'
import './globals.css'
import { Alert } from '@/components/Alert'
import { AppBackground, BlurredPoint } from '@/components/AppBackground'

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
      <body className='min-h-screen py-6 px-48 grid overflow-y-scroll'>
        {children}

        <AppBackground>
          <BlurredPoint className='bg-[#6A71FC]/20' position='left-top' />
          <BlurredPoint className='bg-[#6313ED]/15' position='right-bottom' />
        </AppBackground>

        <Alert />
      </body>
    </html>
  )
}
