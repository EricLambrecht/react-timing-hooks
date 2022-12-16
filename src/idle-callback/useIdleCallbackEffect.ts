import { DependencyList, useCallback, useEffect, useRef } from 'react'
import {
  RequestIdleCallbackHandle,
  IdleCallbackEffectCallback,
  RequestIdleCallbackDeadline,
  RequestIdleCallbackOptions,
} from './types'
import { logWarning } from '../util/logging'

/**
 * Behaves like a regular use effect except that its callback receives a function-argument that allows
 * to run callbacks via `window.requestIdleCallback` inside the effect. Pending idle callbacks will be cleared on unmount.
 * @param effect
 * @param deps
 */
const useIdleCallbackEffect = (
  effect: IdleCallbackEffectCallback,
  deps: DependencyList
) => {
  if (!window.requestIdleCallback) {
    logWarning('This browser does not support "requestIdleCallback"')
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
    return effect(idleCallbackFunc)
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
