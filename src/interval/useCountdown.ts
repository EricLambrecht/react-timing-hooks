import useCounter from './useCounter'
import { IntervalControls } from './useInterval'

const useCountdown = (start: number): [number, IntervalControls] =>
  useCounter({ start, interval: 1000, stepSize: -1 })

export default useCountdown
