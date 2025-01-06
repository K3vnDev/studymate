import type { Metadata } from 'next'
import './globals.css'
import { AppBackground } from '@/components/AppBackground'

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
        <AppBackground />
      </body>
    </html>
  )
}
