import useAnimationFrame from './useAnimationFrame'
import { useCallback, useEffect, useRef } from 'react'
import useControls, { Controls } from '../controls/useControls'

type AnimationFrameLoopControls = Omit<Controls, 'isPausedRef'>

type AnimationFrameLoopOptions = {
  startOnMount?: boolean
}

const useAnimationFrameLoop = <T extends (...args: never[]) => unknown>(
  callback: T,
  options: AnimationFrameLoopOptions = {}
): AnimationFrameLoopControls => {
  const { startOnMount = false } = options
  const rafCallback = useRef<T>(callback)
  const { isPausedRef, ...controls } = useControls(false, !startOnMount)
  const { isStopped } = controls

  useEffect(() => {
    rafCallback.current = callback
  }, [callback])

  const nextCallback = useCallback(() => {
    if (!isStopped) {
      if (!isPausedRef.current) {
        rafCallback.current()
      }
      runInLoop()
    }
  }, [isStopped])

  const runInLoop = useAnimationFrame(nextCallback)

  useEffect(() => {
    if (!isStopped) {
      const h = runInLoop()
      return () => {
        cancelAnimationFrame(h)
      }
    }
  }, [runInLoop, isStopped])

  return controls
}

export default useAnimationFrameLoop
