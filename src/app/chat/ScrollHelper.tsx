interface Props {
  scrollRef: React.RefObject<HTMLDivElement>
}

export const ScrollHelper = ({ scrollRef }: Props) => (
  <div className='w-8 bg-transparent pointer-events-none my-6' ref={scrollRef} />
)
