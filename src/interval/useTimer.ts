import { useState } from 'react'
import useInterval from './useInterval'

const useTimer = (start = 0): number => {
  const [val, setVal] = useState<number>(start)
  useInterval(() => setVal(val + 1), 1000)
  return val
}

export default useTimer
