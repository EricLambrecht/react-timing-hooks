import useCounter, {
  type CounterControls,
  type CounterSettings,
} from './useCounter'
import { type IntervalOptions } from './useInterval'

type TimerSettings = Pick<
  CounterSettings,
  'resetOnStop' | 'destroyIntervalOnPause'
> &
  IntervalOptions

/**
 * A hook that starts a timer, i.e. a reactive number that is increased every second.
 * @param start Starting value of the timer
 * @param settings A set of timer settings.
 * @param [settings.resetOnStop = true] If true, the timer will reset to the start value on stop. If false, it won't.
 * @param [settings.destroyIntervalOnPause = true] If true, the interval in the background will be destroyed upon pause. If false, it won't.
 * @param [settings.startOnMount = false] If true, the interval will immediately start on mount. If false, it has to be started manually via `start()`.
 * @returns the current timer value.
 */
const useTimer = (
  start = 0,
  settings: TimerSettings = {}
): [number, CounterControls] =>
  useCounter({ start, interval: 1000, stepSize: 1, ...settings })

export default useTimer
