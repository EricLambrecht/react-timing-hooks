import { useState } from 'react'
import { useThrottle } from '../timeout/useThrottle'

/** Behaves like a regular useState hook, except that setting the state
 *  is throttled, i.e. a minimum amount of time will have to pass between
 *  state updates, defined by the specified delay. This allows for rapid
 *  state updates without the actual state value causing too many updates/re-renders. */
function useThrottledState<T>(
  initialState: T,
  delayInMs: number
): [T, (value: T) => void] {
  const [actualStateValue, setActualStateValue] = useState<T>(initialState)

  const setState = useThrottle(setActualStateValue, delayInMs)

  return [actualStateValue, setState]
}

export default useThrottledState
