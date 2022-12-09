import { useCallback, useEffect, useRef, useState } from 'react'
import { TimeoutId } from './types'

/**
 * @param callback The callback that is invoked after the timeout expired
 * @param timeout A timeout in milliseconds
 */
function useTimeout<T extends (...args: never[]) => unknown>(
  callback: T,
  timeout: number
): (...args: Parameters<T>) => NodeJS.Timeout | number {
  const timeoutCallback = useRef<T>(callback)
  const [timeoutId, setTimeoutId] = useState<TimeoutId | null>(null)

  useEffect(() => {
    timeoutCallback.current = callback
  }, [callback])

  useEffect(() => {
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId)
      }
    }
  }, [timeoutId])

  return useCallback<(...args: Parameters<T>) => NodeJS.Timeout | number>(
    (...args: Parameters<T>) => {
      const id = setTimeout(() => timeoutCallback.current(...args), timeout)
      setTimeoutId(id)
      return id
    },
    [timeout]
  )
}

export default useTimeout
