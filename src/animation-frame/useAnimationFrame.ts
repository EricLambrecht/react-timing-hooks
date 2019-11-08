import { useCallback, useEffect, useRef, useState } from 'react'
import { AnimationFrameHandle } from './types'
import { Callback } from '../types'

/**
 * @param callback The callback that is invoked in the next animation frame
 */
const useAnimationFrame = (callback: Callback) => {
  const rafCallback = useRef<Callback>(() => null)
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

  return useCallback((...args: unknown[]) => {
    const h = requestAnimationFrame(() => rafCallback.current(...args))
    setHandle(h)
  }, [])
}

export default useAnimationFrame
