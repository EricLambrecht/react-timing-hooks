import useAnimationFrame from './useAnimationFrame'
import { useCallback, useEffect, useRef } from 'react'

const useAnimationFrameLoop = <T extends (...args: never[]) => unknown>(
  callback: T,
  pause = false
): void => {
  const rafCallback = useRef<T>(callback)
  const pauseValue = useRef<boolean>(false)

  useEffect(() => {
    rafCallback.current = callback
    pauseValue.current = pause
  }, [callback, pause])

  const nextCallback = useCallback(() => {
    if (!pauseValue.current) {
      rafCallback.current()
    }
    runInLoop()
  }, [])

  const runInLoop = useAnimationFrame(nextCallback)

  useEffect(() => {
    runInLoop()
  }, [runInLoop])
}

export default useAnimationFrameLoop
