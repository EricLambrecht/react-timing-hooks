import { DependencyList, useCallback, useEffect, useRef } from 'react'
import {
  RequestIdleCallbackHandle,
  IdleCallbackEffectCallback,
  RequestIdleCallbackDeadline,
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

const useIdleCallbackEffect = (
  effect: IdleCallbackEffectCallback,
  deps: DependencyList
) => {
  if (!window.requestIdleCallback) {
    console.warn('This browser does not support "requestIdleCallback"')
    return
  }

  const idleCallbackHandle = useRef<RequestIdleCallbackHandle | null>(null)
  const idleCallbackFunc = useCallback(
    (
      callback: (deadline: RequestIdleCallbackDeadline) => unknown,
      options?: RequestIdleCallbackOptions
    ) => {
      idleCallbackHandle.current = window.requestIdleCallback(callback, options)
      return idleCallbackHandle.current
    },
    [idleCallbackHandle]
  )

  useEffect(() => {
    // TODO: effect result must be returned!
    effect(idleCallbackFunc)
  }, deps)

  useEffect(() => {
    return function onUnmount() {
      if (idleCallbackHandle.current !== null) {
        window.cancelIdleCallback(idleCallbackHandle.current!)
      }
    }
  }, [idleCallbackHandle])
}

export default useIdleCallbackEffect
