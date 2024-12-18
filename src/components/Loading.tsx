import { LoadingIcon } from './icons'

export const Loading = () => (
  <div className='absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 animate-pulse'>
    <LoadingIcon className='size-20 animate-spin text-white/25' />
  </div>
)
