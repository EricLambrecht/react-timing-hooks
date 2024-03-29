import { DependencyList, useCallback, useEffect, useRef } from 'react'
import { TimeoutEffectCallback, TimeoutId } from './types'

/**
 * This hook behaves like a regular useEffect except that it provides a timeout function via it's arguments
 * that can be used to spawn timeouts via `window.setTimeout()` from inside the effect. The timeouts will be cleared on unmount.
 * @param effect The effect callback, it receives a timeout function as its first argument and a timeout clearer as its second
 * @param deps The dependency array from useEffect.
 */
const useTimeoutEffect = (
  effect: TimeoutEffectCallback,
  deps: DependencyList
) => {
  const timeoutIds = useRef<TimeoutId[]>([])
  const timeoutFunc = useCallback(
    (handler: () => any, timeout: number) => {
      const id = setTimeout(handler, timeout)
      timeoutIds.current.push(id)
      return id
    },
    [timeoutIds]
  )

  useEffect(() => {
    return effect(timeoutFunc, () => {
      if (timeoutIds.current.length > 0) {
        timeoutIds.current.forEach((id) => {
          clearTimeout(id)
        })
      }
    })
  }, deps)

  useEffect(() => {
    return function onUnmount() {
      if (timeoutIds.current.length > 0) {
        timeoutIds.current.forEach((id) => {
          clearTimeout(id)
        })
      }
    }
  }, [timeoutIds])
}

export default useTimeoutEffect
