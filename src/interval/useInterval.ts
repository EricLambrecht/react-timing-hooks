import { useEffect, useRef } from 'react'
import { IntervalCallback } from './types'

/**
 * This hook was inspired by Dan Abramov's blogpost:
 * https://overreacted.io/making-setinterval-declarative-with-react-hooks/
 *
 * @param callback
 * @param delay
 */
const useInterval = (callback: IntervalCallback, delay: number | null) => {
  const intervalCallback = useRef<IntervalCallback>(() => null)

  useEffect(() => {
    intervalCallback.current = callback
  }, [callback])

  useEffect(() => {
    if (delay !== null) {
      const id = setInterval(() => intervalCallback.current(), delay)
      return () => clearInterval(id)
    }
  }, [delay])
}

export default useInterval
