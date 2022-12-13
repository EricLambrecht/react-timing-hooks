import useCounter from './useCounter'

const useCountdown = (start = 0): number =>
  useCounter({ start, interval: 1000, stepSize: -1 })

export default useCountdown
