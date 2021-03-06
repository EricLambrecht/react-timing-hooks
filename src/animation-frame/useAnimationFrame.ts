import { useCallback, useEffect, useRef, useState } from 'react'
import { AnimationFrameHandle } from './types'

/**
 * @param callback The callback that is invoked in the next animation frame
 */
const useAnimationFrame = <T extends (...args: never[]) => unknown>(
  callback: T
): ((...args: Parameters<T>) => void) => {
  const rafCallback = useRef<T>(callback)
  const [handle, setHandle] = useState<AnimationFrameHandle | null>(null)

  useEffect(() => {
    rafCallback.current = callback
  }, [callback])

  useEffect(() => {
    return () => {
      if (handle) {
        cancelAnimationFrame(handle)
      }
    }
  }, [handle])

  return useCallback<(...args: Parameters<T>) => void>(
    (...args: Parameters<T>) => {
      const h = requestAnimationFrame(() => rafCallback.current(...args))
      setHandle(h)
    },
    []
  )
}

export default useAnimationFrame
