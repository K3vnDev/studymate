interface Props {
  className?: {
    gradient?: string
    main?: string
  }
  children: React.ReactNode
}

export const GradientBorder = ({ children, className }: Props) => (
  <div className={`${className?.main} p-[.125rem] rounded-2xl overflow-hidden relative`}>
    {children}

    <div className='absolute aspect-square w-[calc(200%)] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-[1]'>
      <div className={`${className?.gradient} w-full h-full`} />
    </div>
  </div>
)
