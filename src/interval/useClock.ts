import useTimer from './useTimer'

export interface ClockOptions<T> {
  locales?: string | string[]
  dateTimeFormatOptions?: Intl.DateTimeFormatOptions
  customFormatter?: (date: Date) => T,
  startTimeInMilliseconds?: number,
}

/**
 * Creates a sort of clock, i.e. a reactive time-based value that updates every second.
 * useClock is generic (by default useClock<string> is used). The generic type defines the return type which can be
 * changed by using a custom formatter (see options.customFormatter).
 *
 * @template [T=string]
 * @param options options.locales and options.dateTimeFormatOptions will be directly forwarded to date.toLocaleTimeString(). You can also use options.customFormatter to override the output of the hook. The output must match the generic type of the hook.
 * @returns {T}
 */
const useClock = <T = string>(
  options?: ClockOptions<T>
) => {
  const startTimeInSeconds = (options?.startTimeInMilliseconds || Date.now()) / 1000
  const currentTimeInSeconds = useTimer(startTimeInSeconds)
  const date = new Date(currentTimeInSeconds * 1000)
  if (options?.customFormatter) {
    return options?.customFormatter(date)
  }
  return date.toLocaleTimeString(
    options?.locales,
    options?.dateTimeFormatOptions
  )
}

export default useClock
