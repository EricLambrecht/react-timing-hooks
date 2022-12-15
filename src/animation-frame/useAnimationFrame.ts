import { useCallback, useEffect, useRef } from 'react'
import { AnimationFrameHandle } from './types'

/**
 * Returns a function that can be used to run the given callback via `window.requestAnimationFrame()`.
 *
 * Pending callbacks will be cleared in case the component unmounts.
 *
 * @param callback The callback that is invoked in the next animation frame
 */
const useAnimationFrame = <T extends (...args: never[]) => unknown>(
  callback: T
): ((...args: Parameters<T>) => number) => {
  const rafCallback = useRef<T>(callback)
  const handleRef = useRef<AnimationFrameHandle | null>(null)

  useEffect(() => {
    rafCallback.current = callback
  }, [callback])

  useEffect(() => {
    return () => {
      if (handleRef.current) {
        cancelAnimationFrame(handleRef.current)
      }
    }
  }, [])

  return useCallback<(...args: Parameters<T>) => number>(
    (...args: Parameters<T>) => {
      handleRef.current = requestAnimationFrame(() =>
        rafCallback.current(...args)
      )
      return handleRef.current
    },
    []
  )
}

export default useAnimationFrame
