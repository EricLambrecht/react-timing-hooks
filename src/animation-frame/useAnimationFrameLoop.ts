import { Callback } from '../types'
import useAnimationFrame from './useAnimationFrame'
import { useCallback, useEffect, useRef } from 'react'

const useAnimationFrameLoop = (callback: Callback) => {
  const rafCallback = useRef<Callback>(() => null)

  useEffect(() => {
    rafCallback.current = callback
  }, [callback])

  const nextCallback = useCallback(() => {
    rafCallback.current()
    runNextAnimationFrame()
  }, [])

  const runNextAnimationFrame = useAnimationFrame(nextCallback)

  useEffect(() => {
    runNextAnimationFrame()
  }, [runNextAnimationFrame])
}

export default useAnimationFrameLoop
