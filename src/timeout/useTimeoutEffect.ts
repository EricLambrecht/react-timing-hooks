import { DependencyList, useCallback, useEffect, useRef } from 'react'
import { TimeoutEffectCallback, TimeoutId } from './types'

const useTimeoutEffect = (
  effect: TimeoutEffectCallback,
  deps: DependencyList
) => {
  const timeoutIds = useRef<TimeoutId[]>([])
  const timeoutFunc = useCallback(
    (handler: () => any, timeout: number) => {
      const id = setTimeout(handler, timeout)
      timeoutIds.current.push(id)
    },
    [timeoutIds]
  )

  useEffect(() => {
    return effect(timeoutFunc, () => {
      if (timeoutIds.current.length > 0) {
        timeoutIds.current.forEach(id => {
          clearTimeout(id)
        })
      }
    })
  }, deps)

  useEffect(() => {
    return function onUnmount() {
      if (timeoutIds.current.length > 0) {
        timeoutIds.current.forEach(id => {
          clearTimeout(id)
        })
      }
    }
  }, [timeoutIds])
}

export default useTimeoutEffect
