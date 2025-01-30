interface Props {
  children: React.ReactNode
  className?: string
  ignorePaddings?: boolean
}

export const Main = ({ children, className = '', ignorePaddings = false }: Props) => {
  const paddings = !ignorePaddings ? 'lg:px-24 px-16 py-12' : ''

  return (
    <main
      className={`
        ${className} ${paddings} xl:w-[calc(100%-22vw-4rem)] w-full bg-main-background border rounded-3xl border-card-border 
        flex flex-col min-h-[calc(100vh-3rem)] xl:justify-self-end justify-self-center
      `}
      id='main'
    >
      {children}
    </main>
  )
}
