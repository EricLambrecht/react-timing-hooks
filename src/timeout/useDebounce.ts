import { useCallback, useEffect, useRef } from 'react'
import { TimeoutId } from './types'

export type DebounceOptions = {
  leading?: boolean
  trailing?: boolean
}

/**
 * Debounces a callback. A debounce is similar to a throttle, but every attempt to call the function resets the
 * block-timer until the function can be executed again. This means that if the debounced callback is consistently
 * called too frequently, it will not be called again at all - until it stops for long enough time.
 *
 * By default, `options.trailing = true`, meaning that the callback will only be invoked as soon as a certain time
 * has passed since the last call (defined by `waitMs`).
 *
 * Alternatively, the function can also be called immediately and then be blocked on consecutive calls until the timeout
 * is over (when `options.leading` is true). You can also set both `options.leading` and `options.trailing` to `true`.
 *
 * @param callback
 * @param waitMs The minimum time until an invocation can happen.
 * @param options
 * @param [options.leading = false] If true, invoke before the timeout
 * @param [options.trailing = true] If true, invoke after the timeout
 */
export function useDebounce<T extends (...args: never[]) => unknown>(
  callback: T,
  waitMs: number,
  options: DebounceOptions = {}
): (...args: Parameters<T>) => NodeJS.Timeout | number {
  const { leading = false, trailing = true } = options
  const debouncedCallback = useRef<T>(callback)
  const timeoutId = useRef<TimeoutId | null>(null)

  useEffect(() => {
    debouncedCallback.current = callback
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
        debouncedCallback.current(...args)
      }

      timeoutId.current = setTimeout(() => {
        if (trailing) {
          debouncedCallback.current(...args)
        }
        timeoutId.current = null
      }, waitMs)

      return timeoutId.current
    },
    [waitMs]
  )
}
