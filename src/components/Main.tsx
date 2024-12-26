interface Props {
  children: React.ReactNode
  className?: string
}

export const Main = ({ children, className = '' }: Props) => (
  <main
    className={`
      ${className} w-[calc(100%-32rem)] bg-main-background border rounded-3xl border-card-border 
      flex flex-col min-h-[calc(100vh-3rem)]
    `}
    id='main'
  >
    {children}
  </main>
)
