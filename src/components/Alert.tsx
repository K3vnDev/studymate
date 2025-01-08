'use client'

import { EVENTS, FONTS } from '@/consts'
import { useEvent } from '@/hooks/useEvent'
import type { AlertData } from '@/types.d'
import { CrossIcon } from '@icons'
import { useState } from 'react'
import { Header } from './Header'
import { Paragraph } from './Paragraph'

export const Alert = () => {
  const [data, setData] = useState<AlertData | null>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [isLoading, setIsloading] = useState(false)

  useEvent(EVENTS.ON_SHOW_ALERT, ({ detail }: CustomEvent) => {
    setData(detail as AlertData)
    setIsVisible(true)
  })

  const [opacity, scale, pointerEvents] = isVisible
    ? ['opacity-100', 'scale-100', 'pointer-events-auto']
    : ['opacity-0', 'scale-75', 'pointer-events-none']

  const visibility = {
    show: () => setIsVisible(true),
    hide: () => setIsVisible(false)
  }

  const handleAccept = async () => {
    setIsloading(true)
    await data?.acceptButton.onClick()

    setIsloading(false)
    visibility.hide()
  }

  const handleReject = () => {
    data?.rejectButton.onClick()
    visibility.hide()
  }

  return (
    <div
      className={`
        ${opacity} ${pointerEvents} fixed bg-black/25 top-0 left-0 w-screen h-screen z-30 
        flex justify-center items-center transition duration-200
      `}
      onPointerDown={visibility.hide}
    >
      <div
        className={`
          ${opacity} ${scale} bg-gray-40 border border-gray-30 rounded-xl px-10 py-6 flex 
          flex-col gap-6 shadow-card w-min transition duration-200
        `}
        onPointerDown={e => e.stopPropagation()}
      >
        <p className='flex flex-col gap-2'>
          <Header>{data?.header}</Header>
          <Paragraph>{data?.message}</Paragraph>
        </p>

        <section className='flex gap-4 w-fit flex-nowrap'>
          <Button className='text-gray-10 border-gray-10 *:stroke-[3px]' onClick={handleReject}>
            <CrossIcon className='opacity-50' /> Cancel
          </Button>
          <Button className='text-error border-error *:stroke-[1.5px]' onClick={handleAccept}>
            {[data?.acceptButton.icon, data?.acceptButton.text]}
          </Button>
        </section>
      </div>
    </div>
  )
}

interface ButtonProps {
  children: React.ReactNode
  className?: string
  disabled?: boolean
  onClick?: () => void
}

const Button = ({ children, className = '', disabled = false, onClick }: ButtonProps) => (
  <button
    className={`
      ${className} ${FONTS.INTER} px-5 py-2 rounded-lg border text-lg font-bold button 
      hover:brightness-150 flex flex-nowrap text-nowrap items-center gap-2 *:size-6
    `}
    {...{ disabled, onClick }}
  >
    {children}
  </button>
)
