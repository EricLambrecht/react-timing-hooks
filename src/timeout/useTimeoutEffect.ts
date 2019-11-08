import { DependencyList, useCallback, useEffect, useRef } from 'react'
import { TimeoutEffectCallback, TimeoutId } from './types'

const useTimeoutEffect = (
  effect: TimeoutEffectCallback,
  deps: DependencyList
) => {
  const timeoutId = useRef<TimeoutId | null>(null)
  const timeoutFunc = useCallback(
    (handler: () => any, timeout: number) => {
      timeoutId.current = setTimeout(handler, timeout)
    },
    [timeoutId]
  )

  useEffect(() => {
    // TODO: effect result must be returned!
    effect(timeoutFunc)
  }, deps)

  useEffect(() => {
    return function onUnmount() {
      if (timeoutId.current !== null) {
        clearTimeout(timeoutId.current)
      }
    }
  }, [timeoutId])
}

export default useTimeoutEffect
