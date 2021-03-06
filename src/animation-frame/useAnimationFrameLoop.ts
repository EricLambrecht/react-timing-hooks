import useAnimationFrame from './useAnimationFrame'
import { useCallback, useEffect, useRef } from 'react'

const useAnimationFrameLoop = <T extends (...args: never[]) => unknown>(
  callback: T,
  stop = false
): void => {
  const rafCallback = useRef<T>(callback)
  const stopValue = useRef<boolean>(false)

  useEffect(() => {
    rafCallback.current = callback
    stopValue.current = stop
  }, [callback, stop])

  const nextCallback = useCallback(() => {
    if (!stopValue.current) {
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
