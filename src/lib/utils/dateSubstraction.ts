export const dateSubstraction = (dateString: string) => {
  const [year, month, day] = dateString.split('-').map(v => +v)

  const date = new Date(year, month - 1, day)
  date.setHours(0, 0, 0, 0)

  const today = new Date()
  today.setHours(0, 0, 0, 0)

  return date.getTime() - today.getTime()
}
