export const parseDays = (n: number) => {
  const s = n !== 1 ? 's' : ''
  return `${n} day${s}`
}
