/*
 * This hook was inspired by Dan Abramov's blogpost:
 * https://overreacted.io/making-setinterval-declarative-with-react-hooks/
 */
import { useCallback, useEffect, useRef } from 'react'
import useControls, { Controls } from '../controls/useControls'

export type IntervalControls = Omit<Controls, 'isPausedRef'>

export type IntervalOptions = {
  /** If true, the interval will start running as soon as the component using this hook is mounted. If false, it has to be started manually via `start()`. */
  startOnMount?: boolean
  /** If true, the provided callback will be invoked immediately on start. If false (default), the callback's first invocation will be after the first interval step, same behaviour as Javascript's `setInterval`. */
  isLeading?: boolean
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
 *
 * @returns An object of properties to control the interval or see it's status
 */
const useInterval = <T extends Function>(
  callback: T,
  delay: number | null,
  options: IntervalOptions = {}
): IntervalControls => {
  const { startOnMount = false, isLeading = false } = options
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
      if (isLeading) {
        onIntervalStep()
      }
      intervalId.current = setInterval(onIntervalStep, delay)
      return () => clearInterval(intervalId.current!)
    }
  }, [delay, isStopped])

  return { ...controls }
}

export default useInterval
