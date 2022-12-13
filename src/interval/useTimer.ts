import useCounter from './useCounter'

const useTimer = (start = 0): number => {
  const [value] = useCounter({ start, interval: 1000, stepSize: 1 })
  return value
}

export default useTimer
