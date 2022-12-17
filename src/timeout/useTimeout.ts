import { useCallback, useEffect, useRef } from 'react'
import { TimeoutId } from './types'

/**
 * This hook will return a function that executes the provided callback after the specified amount of time.
 *
 * This **will not debounce** the callbacks, i.e. consecutive calls of this function will all spawn new timeouts even
 * if some are still pending. If you want a debouncing version, take a look at `useDebounce()`.
 *
 * Pending callbacks will only(!) be cleared in case the component unmounts.
 *
 * @param callback The callback that is invoked after the timeout expired
 * @param timeout A timeout in milliseconds
 *
 * @returns a function that executes the provided callback after the specified amount of time
 */
function useTimeout<T extends (...args: never[]) => unknown>(
  callback: T,
  timeout: number
): (...args: Parameters<T>) => NodeJS.Timeout | number {
  const timeoutCallback = useRef<T>(callback)
  const timeoutIds = useRef<TimeoutId[]>([])

  useEffect(() => {
    timeoutCallback.current = callback
  }, [callback])

  useEffect(() => {
    return () => {
      timeoutIds.current.forEach((id) => clearTimeout(id))
    }
  }, [timeoutIds])

  return useCallback<(...args: Parameters<T>) => NodeJS.Timeout | number>(
    (...args: Parameters<T>) => {
      const id = setTimeout(() => timeoutCallback.current(...args), timeout)
      timeoutIds.current.push(id)
      return id
    },
    [timeout]
  )
}

export default useTimeout
