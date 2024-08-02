import { useState, useRef, useCallback } from 'react'
import useInterval from './useInterval'

/** Behaves like a regular useState hook, except that setting the state
 *  is throttled, i.e. a minimum amount of time will have to pass between
 *  state updates, defined by the specified delay. This allows for rapid
 *  state updates without the actual state value causing too many updates/re-renders. */
function useThrottledState<T>(
  initialState: T,
  delayInMs: number
): [T, (value: T) => void] {
  const [actualStateValue, setActualStateValue] = useState<T>(initialState)
  const queuedNewValue = useRef<T>(initialState)
  const unprocessedUpdates = useRef<boolean>(false)

  const flushQueue = useCallback(() => {
    setActualStateValue(queuedNewValue.current)
    unprocessedUpdates.current = false
  }, [])

  const { start, stop, isStopped } = useInterval(() => {
    if (unprocessedUpdates.current) {
      flushQueue()
    } else {
      stop()
    }
  }, delayInMs)

  const setState = useCallback(
    (value: T): void => {
      queuedNewValue.current = value

      if (isStopped) {
        // start interval and immediately flush the queue, since intervals run the first iteration only *after* the set delay.
        flushQueue()
        start()
      } else {
        // it's not yet time to stop the interval
        unprocessedUpdates.current = true
      }
    },
    [isStopped, start, flushQueue]
  )

  return [actualStateValue, setState]
}

export default useThrottledState
