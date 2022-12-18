import { useCallback, useEffect, useRef } from 'react'
import { TimeoutId } from './types'

export type ThrottleOptions = {
  leading?: boolean
  trailing?: boolean
}

/**
 * Throttles a callback.
 *
 * Can be used for **rate-limiting** – the callback will only be invoked every X milliseconds (X being the set timeout),
 * even if it was called more frequently.
 *
 * Similar, but different(!), is the `useDebounce()` hook, which blocks the invocation entirely until the function was
 * stopped being called for X milliseconds.
 *
 * By default, the throttled function will always be called immediately (`options.leading` is true by default) and then
 * (`options.trailing` is true by default) also after every X milliseconds for consecutive calls.
 *
 * @param callback
 * @param waitMs Minimum waiting time between consecutive calls
 * @param options
 * @param [options.leading = true] If true, invoke the callback immediately/before the timeout
 * @param [options.trailing = true] If true, queue invocations for after the timeout
 */
export function useThrottle<T extends (...args: never[]) => unknown>(
  callback: T,
  waitMs: number,
  options: ThrottleOptions = {}
): (...args: Parameters<T>) => NodeJS.Timeout | number {
  const { leading = true, trailing = true } = options
  const hadUnsuccessfulAttempt = useRef(false)
  const trailingArgs = useRef<Parameters<T> | null>(null)
  const throttledCallback = useRef<T>(callback)
  const timeoutId = useRef<TimeoutId | null>(null)

  useEffect(() => {
    throttledCallback.current = callback
  }, [callback])

  useEffect(() => {
    return () => {
      if (timeoutId.current) {
        clearTimeout(timeoutId.current)
      }
    }
  }, [])

  const execThrottled = useCallback<
    (...args: Parameters<T>) => NodeJS.Timeout | number
  >(
    (...args: Parameters<T>) => {
      if (timeoutId.current) {
        if (trailing) {
          hadUnsuccessfulAttempt.current = true
          trailingArgs.current = args
        }
        return timeoutId.current
      }

      if (!hadUnsuccessfulAttempt.current) {
        if (leading) {
          throttledCallback.current(...args)
        } else if (trailing) {
          hadUnsuccessfulAttempt.current = true
          trailingArgs.current = args
        }
      }

      timeoutId.current = setTimeout(() => {
        timeoutId.current = null
        if (hadUnsuccessfulAttempt.current) {
          if (trailing) {
            throttledCallback.current(...trailingArgs.current!)
          }
          execThrottled(...trailingArgs.current!)
          hadUnsuccessfulAttempt.current = false
        }
      }, waitMs)

      return timeoutId.current
    },
    [waitMs]
  )
  return execThrottled
}
