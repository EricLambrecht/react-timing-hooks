import { useEffect, useRef } from 'react'
import useCounter, { CounterSettings } from './useCounter'
import { IntervalControls } from './useInterval'
import { logError } from '../util/logging'

export type CountdownSettings = Partial<CounterSettings> & {
  onEnd?: () => unknown
}

/**
 * This hook creates a countdown that starts and ends at the specified numbers.
 * By default, the value will be changed every second and count downwards. Both properties can be changed, though.
 *
 * The user will be notified when the countdown ends via the event callback `settings.onEnd()`.
 *
 * Use the returned `start()` callback or set `settings.startOnMount` to start the countdown.
 *
 * @param from Start value
 * @param to End value. Will trigger the `settings.onEnd()` callback.
 * @param settings A set of countdown settings.
 * @param settings.onEnd If set, this callback will be called when the 2nd param "`to`" is reached.
 * @param [settings.resetOnStop = false] If true, the countdown will reset to the start value on stop. If false, it won't.
 * @param [settings.destroyIntervalOnPause = true] If true, the interval in the background will be destroyed upon pause. If false, it won't.
 * @param [settings.startOnMount = false] If true, the interval will immediately start on mount. If false, it has to be started manually via `start()`.
 * @returns an array: the first element is the countdown value, the second is an object of interval controls, see useInterval()
 */
const useCountdown = (
  from: number,
  to: number,
  settings: CountdownSettings = {}
): [number, IntervalControls] => {
  const onEndCallback = useRef(settings.onEnd)
  const [value, counterControls] = useCounter({
    start: from,
    interval: 1000,
    stepSize: -1,
    resetOnStop: false,
    ...settings,
  })

  useEffect(() => {
    onEndCallback.current = settings.onEnd
  }, [settings.onEnd])

  useEffect(() => {
    if (
      to > from &&
      (typeof settings.stepSize === 'undefined' || settings.stepSize < 0)
    ) {
      logError(
        `Stopped countdown because a countdown from ${from} to ${to} will never end`
      )
      counterControls.stop()
    }
  }, [from, to])

  useEffect(() => {
    if (value === to) {
      onEndCallback.current?.()
      counterControls.stop()
    }
  }, [value])

  return [value, counterControls]
}

export default useCountdown
