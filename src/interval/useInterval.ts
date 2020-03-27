import { useEffect, useRef } from 'react'

/**
 * This hook was inspired by Dan Abramov's blogpost:
 * https://overreacted.io/making-setinterval-declarative-with-react-hooks/
 *
 * @param callback
 * @param delay
 */
const useInterval = <T extends (...args: never[]) => unknown>(
  callback: T,
  delay: number | null
): void => {
  const intervalCallback = useRef<T>(callback)

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
