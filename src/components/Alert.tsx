'use client'

import { Header } from '@components/Header'
import { Paragraph } from '@components/Paragraph'
import { Waitable } from '@components/Waitable'
import { EVENTS, FONTS } from '@consts'
import { useEvent } from '@hooks/useEvent'
import { useJustLoaded } from '@hooks/useJustLoaded'
import { CrossIcon } from '@icons'
import type { AlertData } from '@types'
import { useState } from 'react'

export const Alert = () => {
  const [data, setData] = useState<AlertData | null>(null)
  const [isVisible, setIsVisible] = useState(false)
  const justLoaded = useJustLoaded(1000, [isVisible])

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

  if (!data) return null
  const { acceptButton, rejectButton, header, message } = data

  const handleAccept = async () => {
    await acceptButton.onClick()
    visibility.hide()
  }

  const handleReject = () => {
    rejectButton.onClick()
    visibility.hide()
  }

  return (
    <div
      className={`
        ${opacity} ${pointerEvents} fixed bg-black/30 top-0 left-0 w-screen h-screen z-30 
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
        <div className='flex flex-col gap-2.5'>
          <Header>{header}</Header>
          <Paragraph>{message}</Paragraph>
        </div>

        <section className='flex gap-4 w-fit flex-nowrap'>
          <Button className='text-gray-10 border-gray-10' onClick={handleReject}>
            <CrossIcon /> Cancel
          </Button>

          <Button
            className='text-error border-error/35 *:stroke-[1.5px]'
            onClick={handleAccept}
            disabled={justLoaded}
            key={acceptButton.text}
          >
            {acceptButton.icon}
            {acceptButton.text}
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
  onClick?: () => void | Promise<void>
  danger?: boolean
}

const Button = ({ children, className = '', disabled = false, onClick = () => {} }: ButtonProps) => {
  const [isLoading, setIsLoading] = useState(false)

  const handleClick = async () => {
    setIsLoading(true)
    await onClick()
    setIsLoading(false)
  }

  return (
    <button
      className={`
        ${className} ${FONTS.INTER} px-5 py-2 rounded-lg border text-lg font-bold button 
        hover:brightness-150 active:brightness-75 flex flex-nowrap text-nowrap items-center gap-1.5 *:size-6
      `}
      disabled={disabled || isLoading}
      onClick={handleClick}
    >
      <Waitable isWaiting={isLoading}>{children}</Waitable>
    </button>
  )
}
