export const getElementRef = <T = HTMLElement>(elementRef: React.MutableRefObject<null>) => {
  return (elementRef.current ?? undefined) as T
}
