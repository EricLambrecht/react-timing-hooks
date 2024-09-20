import { act } from 'react'

export const advanceTimersUsingAct = async (
  times: number,
  stepLengthInMs = 1000
) => {
  for (let i = 0; i < times; i++) {
    await act(() => {
      jest.advanceTimersByTime(stepLengthInMs)
    })
  }
}
