import { MutableRefObject, useCallback, useRef, useState } from 'react'

export type Controls = {
  isPaused: boolean
  isStopped: boolean
  isPausedRef: MutableRefObject<boolean>
  /** Pauses the interval */
  pause: () => void
  /** Resumes the interval */
  resume: () => void
  /** Stops the interval */
  stop: () => void
  /** Starts the interval */
  start: () => void
}

/**
 * This private API hook adds controls like play, pause, start, stop to a hook.
 * @param isPausedInitially
 * @param isStoppedInitially
 */
const useControls = (
  isPausedInitially = false,
  isStoppedInitially = false
): Controls => {
  const [isPaused, setIsPaused] = useState(isPausedInitially)
  const [isStopped, setIsStopped] = useState(isStoppedInitially)
  const isPausedRef = useRef(isPausedInitially)

  const pause = useCallback(() => {
    isPausedRef.current = true
    setIsPaused(true) // notify interval owner
  }, [setIsPaused])

  const resume = useCallback(() => {
    isPausedRef.current = false
    setIsPaused(false) // notify interval owner
  }, [setIsPaused])

  const stop = useCallback(() => {
    setIsStopped(true)
  }, [setIsStopped])

  const start = useCallback(() => {
    isPausedRef.current = false
    setIsPaused(false)
    setIsStopped(false)
  }, [setIsStopped])

  return {
    isPaused,
    isPausedRef,
    isStopped,
    pause,
    resume,
    stop,
    start,
  }
}

export default useControls
