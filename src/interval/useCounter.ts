import { useState } from 'react'
import useInterval, { IntervalControls } from './useInterval'

type CounterSettings = {
  start: number
  interval: number
  stepSize: number
}

const useCounter = (settings: CounterSettings): [number, IntervalControls] => {
  const { start = 0, interval = 1000, stepSize = 1 } = settings
  const [val, setVal] = useState<number>(start)
  const intervalControls = useInterval(() => setVal(val + stepSize), interval)
  return [val, intervalControls]
}

export default useCounter
