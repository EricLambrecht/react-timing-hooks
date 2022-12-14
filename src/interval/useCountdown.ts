import useCounter from './useCounter'
import { IntervalControls, IntervalOptions } from './useInterval'

/**
 * This hook creates a countdown that starts at the specified number and decreases this number each second.
 * The current value of the countdown is returned from the hook. The countdown will start immediately on creation.
 * @param start Starting value of the countdown
 * @param options A set of interval options, see useInterval().
 * @param [options.startOnMount = false] If true, the interval will immediately start on mount. If false, it has to be started manually via `start()`.
 * @returns an array: the first element is the countdown value, the second is an object of interval controls, see useInterval()
 */
const useCountdown = (
  start: number,
  options: IntervalOptions = {}
): [number, IntervalControls] =>
  useCounter({ start, interval: 1000, stepSize: -1, ...options })

export default useCountdown
