import { useState } from 'react'
import useInterval from './useInterval'

type CounterSettings = {
  start: number,
  interval: number,
  stepSize: number
}

const useCounter = (settings: CounterSettings): number => {
  const { start = 0, interval = 1000, stepSize = 1 } = settings
  const [val, setVal] = useState<number>(start)
  useInterval(() => setVal(val + stepSize), interval)
  return val
}

export default useCounter
