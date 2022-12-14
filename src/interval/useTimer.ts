import useCounter from './useCounter'

/**
 * A hook that starts a timer, i.e. a reactive number that is increased every second.
 * @param start Starting value of the timer
 * @returns the current timer value.
 */
const useTimer = (start = 0): number => {
  const [value] = useCounter({ start, interval: 1000, stepSize: 1 })
  return value
}

export default useTimer
