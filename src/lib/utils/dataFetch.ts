interface Params<T> {
  url: string
  options?: RequestInit
  onSuccess?: (data: T, message?: string) => void
  onError?: (message?: string) => void
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
      return onError(message)
    }
    onSuccess(data, message)
  } catch {
    onError()
  }
}
