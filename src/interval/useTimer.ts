import useCounter from './useCounter'
import { IntervalOptions } from './useInterval'

/**
 * A hook that starts a timer, i.e. a reactive number that is increased every second.
 * @param start Starting value of the timer
 * @param options A set of interval options, see useInterval().
 * @param [options.startOnMount = false] If true, the interval will immediately start on mount. If false, it has to be started manually via `start()`.
 * @returns the current timer value.
 */
const useTimer = (start = 0, options: IntervalOptions = {}): number => {
  const [value] = useCounter({ start, interval: 1000, stepSize: 1, ...options })
  return value
}

export default useTimer
