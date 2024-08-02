import { useCallback, useState } from 'react'
import useInterval, { IntervalControls, IntervalOptions } from './useInterval'

export type CounterSettings = {
  start: number
  interval: number
  stepSize: number
  resetOnStop?: boolean
  destroyIntervalOnPause?: boolean
} & IntervalOptions

export type CounterControls = IntervalControls & {
  reset(): void
}

/**
 * A hook that updates a number on a regular interval based on the provided settings.
 *
 * Active intervals will be cleared on unmount.
 *
 * @param settings Counter settings and interval options
 * @param settings.start the initial value
 * @param settings.interval duration in ms between steps
 * @param settings.stepSize amount that is added to the current counter value on every step
 * @param [settings.resetOnStop = true] If true, the counter will reset to the start value on stop. If false, it won't.
 * @param [settings.destroyIntervalOnPause = true] If true, the interval in the background will be destroyed upon pause. If false, it won't.
 * @param [settings.startOnMount = false] If true, the interval will immediately start on mount. If false, it has to be started manually via `start()`.
 */
const useCounter = (settings: CounterSettings): [number, CounterControls] => {
  const {
    start,
    interval,
    stepSize,
    resetOnStop = true,
    destroyIntervalOnPause = true,
    ...intervalOptions
  } = settings
  const [val, setVal] = useState<number>(start)
  const intervalControls = useInterval(
    () => setVal(val + stepSize),
    interval,
    intervalOptions
  )

  const reset = useCallback(() => {
    setVal(start)
  }, [setVal])

  const stopFunction = useCallback(() => {
    if (resetOnStop) {
      reset()
    }
    intervalControls.stop()
  }, [resetOnStop])

  const counterControls = {
    ...intervalControls,
    stop: stopFunction,
    pause: destroyIntervalOnPause
      ? intervalControls.stop
      : intervalControls.pause,
    resume: destroyIntervalOnPause
      ? intervalControls.start
      : intervalControls.resume,
    reset,
  }

  return [val, counterControls]
}

export default useCounter
