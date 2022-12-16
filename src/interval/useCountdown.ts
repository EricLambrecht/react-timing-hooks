import { useEffect, useRef } from 'react'
import useCounter, { CounterSettings } from './useCounter'
import { IntervalControls } from './useInterval'
import { logError } from '../util/logging'

export type CountdownOptions = Partial<CounterSettings> & {
  onEnd?: () => unknown
}

/**
 * This hook creates a countdown that starts and ends at the specified numbers.
 * By default, the value will be changed every second and count downwards. Both properties can be changed, though.
 *
 * The user will be notified when the countdown ends via the event callback `options.onEnd()`.
 *
 * Use the returned `start()` callback or set `options.startOnMount` to start the countdown.
 *
 * @param from Start value
 * @param to End value. Will trigger the `options.onEnd()` callback.
 * @param options A set of countdown options.
 * @param options.onEnd If set, this callback will be called when the 2nd param "`to`" is reached.
 * @param [options.startOnMount = false] If true, the interval will immediately start on mount. If false, it has to be started manually via `start()`.
 * @returns an array: the first element is the countdown value, the second is an object of interval controls, see useInterval()
 */
const useCountdown = (
  from: number,
  to: number,
  options: CountdownOptions = {}
): [number, IntervalControls] => {
  const onEndCallback = useRef(options.onEnd)
  const [value, counterControls] = useCounter({
    start: from,
    interval: 1000,
    stepSize: -1,
    ...options,
  })

  useEffect(() => {
    onEndCallback.current = options.onEnd
  }, [options.onEnd])

  useEffect(() => {
    if (
      to > from &&
      (typeof options.stepSize === 'undefined' || options.stepSize < 0)
    ) {
      logError(
        `Stopped countdown because a countdown from ${from} to ${to} will never end`
      )
      counterControls.stop()
    }
  }, [from, to])

  useEffect(() => {
    if (value === to) {
      counterControls.stop()
      onEndCallback.current?.()
    }
  }, [value])

  return [value, counterControls]
}

export default useCountdown
