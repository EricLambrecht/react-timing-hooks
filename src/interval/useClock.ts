import useTimer from './useTimer'
import { IntervalControls } from './useInterval'

export interface ClockOptions<T> {
  locales?: string | string[]
  dateTimeFormatOptions?: Intl.DateTimeFormatOptions
  customFormatter?: (date: Date) => T
  startTimeInMilliseconds?: number
}

/**
 * Creates a sort of clock, i.e. a reactive time-based value that updates every second.
 * useClock is generic (by default useClock<string> is used). The generic type defines the return type which can be
 * changed by using a custom formatter (see options.customFormatter).
 *
 * @template [T=string]
 * @param options options.locales and options.dateTimeFormatOptions will be directly forwarded to date.toLocaleTimeString(). You can also use options.customFormatter to override the output of the hook. The output must match the generic type of the hook.
 * @returns The current (formatted) time
 */
const useClock = <T = string>(options?: ClockOptions<T>) => {
  const startTimeMs = options?.startTimeInMilliseconds || Date.now()
  const startTimeInSeconds = startTimeMs / 1000

  const [currentTimeInSeconds, controls] = useTimer(startTimeInSeconds, {
    startOnMount: true,
  })
  const date = new Date(currentTimeInSeconds * 1000)

  const formattedTime = options?.customFormatter
    ? options?.customFormatter(date)
    : date.toLocaleTimeString(options?.locales, options?.dateTimeFormatOptions)

  return [formattedTime, controls] as [T, IntervalControls]
}

export default useClock
