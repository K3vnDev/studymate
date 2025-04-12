interface Params<T> {
  url: string
  options?: RequestInit
  onSuccess?: (data: T, message?: string, status?: number) => void
  onError?: (message?: string, status?: number) => void
  onFinish?: () => void
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
  onError = () => {},
  onFinish = () => {}
}: Params<T>): Promise<T | undefined> => {
  try {
    const res = await fetch(url, options)
    const { success, data, message } = (await res.json()) as JSONResponse<T>

    if (!success || !res.ok) {
      onError(message, res.status)
      return
    }
    onSuccess(data, message, res.status)
    return data
  } catch (err) {
    onError(err as string)
  } finally {
    onFinish()
  }
}
