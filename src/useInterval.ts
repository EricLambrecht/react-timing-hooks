import { useEffect, useRef } from 'react'
import { IntervalCallback } from './types'

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
