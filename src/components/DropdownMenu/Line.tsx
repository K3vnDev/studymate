import type { ReusableComponent } from '@types'
import { twMerge } from 'tailwind-merge'

export const Line = ({ className = '', style }: ReusableComponent) => (
  <div className={twMerge(`w-full h-[1px] my-3 bg-gray-40 ${className}`)} {...{ style }} />
)
