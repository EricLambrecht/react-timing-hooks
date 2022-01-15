import useTimer from './useTimer'

const useClock = (
  startTimeInMilliseconds = Date.now(),
  formatter = (date: Date) => date.toLocaleTimeString()
) => {
  const startTimeInSeconds = startTimeInMilliseconds / 1000
  const currentTimeInSeconds = useTimer(startTimeInSeconds)
  const date = new Date(currentTimeInSeconds * 1000)
  return formatter(date)
}

export default useClock
