import type { Metadata } from 'next'
import './globals.css'
import { Sidebar } from '@/components/Sidebar'

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
      <body className='bg-zinc-950 min-h-screen py-6 px-48 flex justify-end overflow-y-scroll'>
        <Sidebar />
        {children}
      </body>
    </html>
  )
}
