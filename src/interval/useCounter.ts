import { useState } from 'react'
import useInterval, { IntervalControls, IntervalOptions } from './useInterval'

export type CounterSettings = {
  start: number
  interval: number
  stepSize: number
} & IntervalOptions

/**
 * A hook that updates a number on a regular interval based on the provided settings.
 *
 * Active intervals will be cleared on unmount.
 *
 * @param settings Counter settings and interval options
 * @param settings.start the initial value
 * @param settings.interval duration in ms between steps
 * @param settings.stepSize amount that is added to the current counter value on every step
 * @param [settings.startOnMount = false] If true, the interval will immediately start on mount. If false, it has to be started manually via `start()`.
 */
const useCounter = (settings: CounterSettings): [number, IntervalControls] => {
  const {
    start = 0,
    interval = 1000,
    stepSize = 1,
    ...intervalOptions
  } = settings
  const [val, setVal] = useState<number>(start)
  const intervalControls = useInterval(
    () => setVal(val + stepSize),
    interval,
    intervalOptions
  )
  return [val, intervalControls]
}

export default useCounter
