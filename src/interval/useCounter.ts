import { useState } from 'react'
import useInterval, { IntervalControls } from './useInterval'

type CounterSettings = {
  start: number
  interval: number
  stepSize: number
}

/**
 * A hook that updates a number on a regular interval based on the provided settings.
 *
 * Active intervals will be cleared on unmount.
 *
 * @param settings.start the initial value
 * @param settings.interval duration in ms between steps
 * @param settings.stepSize amount that is added to the current counter value on every step
 */
const useCounter = (settings: CounterSettings): [number, IntervalControls] => {
  const { start = 0, interval = 1000, stepSize = 1 } = settings
  const [val, setVal] = useState<number>(start)
  const intervalControls = useInterval(() => setVal(val + stepSize), interval)
  return [val, intervalControls]
}

export default useCounter
