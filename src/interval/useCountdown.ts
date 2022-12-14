import useCounter from './useCounter'
import { IntervalControls } from './useInterval'

/**
 * This hook creates a countdown that starts at the specified number and decreases this number each second.
 * The current value of the countdown is returned from the hook. The countdown will start immediately on creation.
 * @param start Starting value of the countdown
 * @returns an array: the first element is the countdown value, the second is an object of interval controls, see useInterval()
 */
const useCountdown = (start: number): [number, IntervalControls] =>
  useCounter({ start, interval: 1000, stepSize: -1 })

export default useCountdown
