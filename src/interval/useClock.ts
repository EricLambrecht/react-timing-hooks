import useTimer from './useTimer'
import { useCallback, useState } from 'react'
import { CounterControls } from './useCounter'

export interface ClockOptions<T> {
  locales?: string | string[]
  dateTimeFormatOptions?: Intl.DateTimeFormatOptions
  customFormatter?: (date: Date) => T
  startTimeInMilliseconds?: number
  keepPausedClockRunningInBackground?: boolean
}

/**
 * Creates a sort of clock, i.e. a reactive time-based value that updates every second.
 * useClock is generic (by default useClock<string> is used). The generic type defines the return type which can be
 * changed by using a custom formatter (see options.customFormatter).
 *
 * @template [T=string]
 * @param options options.locales and options.dateTimeFormatOptions will be directly forwarded to date.toLocaleTimeString().
 *                You can also use options.customFormatter to override the output of the hook. The output must match the generic type of the hook.
 *                options.keepPausedClockRunningInBackground will allow to only pause the output but not the underlying clock, so that it resumes at the correct time.
 * @returns The current (formatted) time
 */
const useClock = <T = string>(options?: ClockOptions<T>) => {
  const {
    keepPausedClockRunningInBackground = true,
    startTimeInMilliseconds = Date.now(),
    locales,
    dateTimeFormatOptions,
    customFormatter,
  } = options || {}
  const startTimeInSeconds = startTimeInMilliseconds / 1000
  const [timeDuringPause, setTimeDuringPause] = useState<T | null>(null)

  const [currentTimeInSeconds, controls] = useTimer(startTimeInSeconds, {
    startOnMount: true,
    resetOnStop: false, // would be weird UX for a clock
    destroyIntervalOnPause: false, // for better accuracy on pause
  })
  const date = new Date(currentTimeInSeconds * 1000)

  const formattedTime = customFormatter
    ? customFormatter(date)
    : (date.toLocaleTimeString(locales, dateTimeFormatOptions) as T)

  const customPause = useCallback(() => {
    if (keepPausedClockRunningInBackground) {
      setTimeDuringPause(formattedTime)
    } else {
      controls.pause()
    }
  }, [formattedTime, controls.pause])

  const customResume = useCallback(() => {
    if (keepPausedClockRunningInBackground) {
      setTimeDuringPause(null)
    } else {
      controls.resume()
    }
  }, [controls.resume])

  const clockControls = {
    ...controls,
    pause: customPause,
    resume: customResume,
  }

  return [timeDuringPause || formattedTime, clockControls] as [
    T,
    CounterControls,
  ]
}

export default useClock
