import { useCallback, useEffect, useRef } from 'react'
import { TimeoutId } from './types'

export type DebounceOptions = {
  leading?: boolean
  trailing?: boolean
}

/**
 * Debounces a callback.
 *
 * By default, `options.trailing = true`, meaning that the callback will only be invoked as soon as a certain time
 * has passed since the last call (defined by the timeout).
 *
 * Alternatively, the function can also be called immediately and then be blocked on consecutive calls until the timeout
 * is over (when `options.leading` is true). You can also set both `options.leading` and `options.trailing` to `true`.
 *
 * @param callback
 * @param timeout
 * @param options
 */
export function useDebounce<T extends (...args: never[]) => unknown>(
  callback: T,
  timeout: number,
  options: DebounceOptions = {}
): (...args: Parameters<T>) => NodeJS.Timeout | number {
  const { leading = false, trailing = true } = options
  const timeoutCallback = useRef<T>(callback)
  const timeoutId = useRef<TimeoutId | null>(null)

  useEffect(() => {
    timeoutCallback.current = callback
  }, [callback])

  useEffect(() => {
    return () => {
      if (timeoutId.current) {
        clearTimeout(timeoutId.current)
      }
    }
  }, [])

  return useCallback<(...args: Parameters<T>) => NodeJS.Timeout | number>(
    (...args: Parameters<T>) => {
      if (timeoutId.current) {
        clearTimeout(timeoutId.current)
      } else if (leading) {
        timeoutCallback.current(...args)
      }

      timeoutId.current = setTimeout(() => {
        if (trailing) {
          timeoutCallback.current(...args)
        }
        timeoutId.current = null
      }, timeout)

      return timeoutId.current
    },
    [timeout]
  )
}
