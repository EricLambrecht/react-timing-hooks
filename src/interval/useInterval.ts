import { useCallback, useEffect, useRef, useState } from 'react'

export type IntervalControls = {
  isPaused: boolean
  isStopped: boolean
  pause: () => void
  resume: () => void
  stop: () => void
  start: () => void
}

/**
 * This hook was inspired by Dan Abramov's blogpost:
 * https://overreacted.io/making-setinterval-declarative-with-react-hooks/
 *
 * @param callback
 * @param delay
 */
const useInterval = <T extends (...args: never[]) => unknown>(
  callback: T,
  delay: number | null
): IntervalControls => {
  const [isPaused, setIsPaused] = useState(false)
  const [isStopped, setIsStopped] = useState(false)
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
