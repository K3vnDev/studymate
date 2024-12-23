export const getElementRef = <T = HTMLElement>(elementRef: React.MutableRefObject<any>) => {
  return (elementRef.current ?? undefined) as T
}
