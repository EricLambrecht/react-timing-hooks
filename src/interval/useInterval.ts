/*
 * This hook was inspired by Dan Abramov's blogpost:
 * https://overreacted.io/making-setinterval-declarative-with-react-hooks/
 */
import { useCallback, useEffect, useRef, useState } from 'react'

export type IntervalControls = {
  isPaused: boolean
  isStopped: boolean
  pause: () => void
  resume: () => void
  stop: () => void
  start: () => void
}

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
  const [isPaused, setIsPaused] = useState(false)
  const [isStopped, setIsStopped] = useState(!startOnMount)
  const intervalActive = useRef(true)
  const intervalCallback = useRef<T>(callback)
  const intervalId = useRef<number | NodeJS.Timeout | null>(null)

  const pause = useCallback(() => {
    intervalActive.current = false
    setIsPaused(true) // notify interval owner
  }, [setIsPaused])

  const resume = useCallback(() => {
    intervalActive.current = true
    setIsPaused(false) // notify interval owner
  }, [setIsPaused])

  const stop = useCallback(() => {
    setIsStopped(true)
  }, [setIsStopped])

  const start = useCallback(() => {
    intervalActive.current = true
    setIsPaused(false)
    setIsStopped(false)
  }, [setIsStopped])

  useEffect(() => {
    intervalCallback.current = callback
  }, [callback])

  const onIntervalStep = useCallback(() => {
    if (intervalActive.current === true) {
      intervalCallback.current()
    }
  }, [intervalCallback, intervalActive])

  useEffect(() => {
    if (delay !== null && !isStopped) {
      intervalId.current = setInterval(onIntervalStep, delay)
      return () => clearInterval(intervalId.current!)
    }
  }, [delay, isStopped])

  return {
    isPaused,
    isStopped,
    pause,
    resume,
    stop,
    start,
  }
}

export default useInterval
