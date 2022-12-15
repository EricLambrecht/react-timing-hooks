/*
 * This hook was inspired by Dan Abramov's blogpost:
 * https://overreacted.io/making-setinterval-declarative-with-react-hooks/
 */
import { useCallback, useEffect, useRef } from 'react'
import useControls, { Controls } from '../controls/useControls'

export type IntervalControls = Omit<Controls, 'isPausedRef'>

export type IntervalOptions = {
  startOnMount?: boolean
}

/**
 * Calls the given function at a regular interval.
 *
 * The interval can be paused, resumed, stopped etc. via the returned callbacks.
 *
 * Active intervals will be cleared in case the component unmounts.
 *
 * @param callback A function that will be called at the specified interval
 * @param delay time in milliseconds between each invocation of callback. If set to `null` the interval will come to a halt.
 * @param options A set of options to control the interval behaviour.
 * @param [options.startOnMount = false] (optional) Defaults to false. If true, the interval will immediately start on mount. If false, it has to be started manually via `start()`.
 * @returns An object of properties to control the interval or see it's status
 */
const useInterval = <T extends Function>(
  callback: T,
  delay: number | null,
  options: IntervalOptions = {}
): IntervalControls => {
  const { startOnMount = false } = options
  const { isPausedRef, ...controls } = useControls(false, !startOnMount)
  const { isStopped } = controls
  const intervalCallback = useRef<T>(callback)
  const intervalId = useRef<number | NodeJS.Timeout | null>(null)

  useEffect(() => {
    intervalCallback.current = callback
  }, [callback])

  const onIntervalStep = useCallback(() => {
    if (isPausedRef.current === false) {
      intervalCallback.current()
    }
  }, [intervalCallback, isPausedRef])

  useEffect(() => {
    if (delay !== null && !isStopped) {
      intervalId.current = setInterval(onIntervalStep, delay)
      return () => clearInterval(intervalId.current!)
    }
  }, [delay, isStopped])

  return { ...controls }
}

export default useInterval
