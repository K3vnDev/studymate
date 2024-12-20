interface Params<T> {
  url: string
  options?: RequestInit
  onSuccess?: (data: T, message?: string, status?: number) => void
  onError?: (message?: string, status?: number) => void
}

interface JSONResponse<T> {
  success: boolean
  data: T
  message?: string
}

export const dataFetch = async <T>({
  url,
  options,
  onSuccess = () => {},
  onError = () => {}
}: Params<T>) => {
  try {
    const res = await fetch(url, options)
    const { success, data, message } = (await res.json()) as JSONResponse<T>

    if (!success || !res.ok) {
      return onError(message, res.status)
    }
    onSuccess(data, message, res.status)
  } catch (err) {
    onError(err as string)
  }
}
