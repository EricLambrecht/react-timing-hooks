import useInterval, { IntervalControls, IntervalOptions } from './useInterval'
import { useCallback, useState } from 'react'

export type OscillatorSettings = IntervalOptions & {
  /** the initial boolean value (i.e. either true or false) */
  initialValue: boolean
  /** duration in ms between each boolean toggle */
  interval: number
  /** If true, the oscillator will reset to the initial value on stop. If false, it won't. */
  resetOnStop?: boolean
  /** If true, the interval in the background will be destroyed upon pause. If false, it won't. */
  destroyIntervalOnPause?: boolean
}

export type OscillatorControls = IntervalControls & {
  /** Will reset the current value to the initial value */
  reset(): void
}

/**
 * A hook creates an oscillating boolean value,
 * i.e. a value that automatically toggles repeatedly (infinitely switching from true to false and back) at a fixed interval.
 *
 * Active intervals will be cleared on unmount.
 *
 * @param settings Oscillator settings and interval options
 */
const useOscillator = (
  settings: OscillatorSettings
): [boolean, OscillatorControls] => {
  const {
    initialValue,
    interval,
    resetOnStop = true,
    destroyIntervalOnPause = true,
    ...intervalOptions
  } = settings
  const [val, setVal] = useState<boolean>(initialValue)
  const intervalControls = useInterval(
    () => setVal(!val),
    interval,
    intervalOptions
  )

  const reset = useCallback(() => {
    setVal(initialValue)
  }, [setVal])

  const stopFunction = useCallback(() => {
    if (resetOnStop) {
      reset()
    }
    intervalControls.stop()
  }, [resetOnStop])

  const oscillatorControls = {
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

  return [val, oscillatorControls]
}

export default useOscillator
