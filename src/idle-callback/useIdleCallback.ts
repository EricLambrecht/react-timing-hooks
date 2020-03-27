import { useCallback, useEffect, useRef, useState } from 'react'
import {
  RequestIdleCallbackDeadline,
  RequestIdleCallbackHandle,
  RequestIdleCallbackOptions,
} from './types'

declare global {
  interface Window {
    requestIdleCallback: (
      callback: (deadline: RequestIdleCallbackDeadline) => unknown,
      options?: RequestIdleCallbackOptions
    ) => RequestIdleCallbackHandle
    cancelIdleCallback: (handle: RequestIdleCallbackHandle) => void
  }
}

/**
 * @param callback The callback that is invoked as soons as the browser invokes the idle callback
 * @param options Options for requestIdleCallback
 */
const useIdleCallback = <T extends (...args: never[]) => unknown>(
  callback: T,
  options?: RequestIdleCallbackOptions
): ((...args: Parameters<T>) => void) => {
  if (!window.requestIdleCallback) {
    console.warn('This browser does not support "requestIdleCallback"')
    return callback
  }

  const ricCallback = useRef<T>(callback)
  const [handle, setHandle] = useState<RequestIdleCallbackHandle | null>(null)

  useEffect(() => {
    ricCallback.current = callback
  }, [callback])

  useEffect(() => {
    return () => {
      if (handle) {
        window.cancelIdleCallback(handle)
      }
    }
  }, [handle])

  return useCallback<(...args: Parameters<T>) => void>(
    (...args: Parameters<T>) => {
      const h = window.requestIdleCallback(
        () => ricCallback.current(...args),
        options
      )
      setHandle(h)
    },
    [options]
  )
}

export default useIdleCallback
