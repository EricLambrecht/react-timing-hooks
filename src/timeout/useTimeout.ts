import { useCallback, useEffect, useRef, useState } from 'react'
import { TimeoutCallback, TimeoutId } from './types'

/**
 * @param callback The callback that is invoked after the timeout expired
 * @param timeout A timeout in milliseconds
 */
const useTimeout = (callback: TimeoutCallback, timeout: number) => {
  const timeoutCallback = useRef<TimeoutCallback>(() => null)
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

  return useCallback(
    (...args: unknown[]) => {
      const id = setTimeout(() => timeoutCallback.current(...args), timeout)
      setTimeoutId(id)
    },
    [timeout]
  )
}

export default useTimeout
