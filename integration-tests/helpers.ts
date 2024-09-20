/*
  react-test-renderer seems to schedule timeouts with _flushCallback and 0ms timeout which pollute this test
  This function get's rid of those without removing our own timeouts
 */
import { act } from 'react'

export const removeFlushTimers = () => {
  act(() => {
    jest.advanceTimersByTime(1)
  })
}
