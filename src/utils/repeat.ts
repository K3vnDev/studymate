type Callback<T> = (i: number) => T

export const repeat = <T>(n: number, callback: Callback<T>) => {
  return Array(n)
    .fill('')
    .map((_, i) => callback(i))
}
