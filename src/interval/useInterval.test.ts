import { renderHook } from '@testing-library/react'
import useInterval from './useInterval'

describe('useInterval', () => {
  beforeAll(() => {
    jest.useFakeTimers()
  })

  it('calls interval handler every [n] milliseconds, not leading by default', () => {
    const intervalHandler = jest.fn()

    renderHook(() => useInterval(intervalHandler, 100, { startOnMount: true }))

    jest.advanceTimersByTime(100)
    expect(intervalHandler).toHaveBeenCalledTimes(1)

    jest.advanceTimersByTime(100)
    jest.advanceTimersByTime(100)
    expect(intervalHandler).toHaveBeenCalledTimes(3)
  })

  it('can be set to isLeading', () => {
    const intervalHandler = jest.fn()

    renderHook(() =>
      useInterval(intervalHandler, 100, { startOnMount: true, isLeading: true })
    )

    jest.advanceTimersByTime(100)
    expect(intervalHandler).toHaveBeenCalledTimes(2)

    jest.advanceTimersByTime(100)
    jest.advanceTimersByTime(100)
    expect(intervalHandler).toHaveBeenCalledTimes(4)
  })

  it("doesn't set interval if delay is null", () => {
    const intervalHandler = jest.fn()

    renderHook(() => useInterval(intervalHandler, null, { startOnMount: true }))

    jest.runAllTimers()
    expect(intervalHandler).toHaveBeenCalledTimes(0)
  })

  it("doesn't set interval if start on mount is false (the default)", () => {
    const intervalHandler = jest.fn()

    renderHook(() => useInterval(intervalHandler, 1000))

    jest.runAllTimers()
    expect(intervalHandler).toHaveBeenCalledTimes(0)
  })

  it('properly cleans up interval after unmount', () => {
    const intervalHandler = jest.fn()

    const { unmount } = renderHook(() =>
      useInterval(intervalHandler, 500, { startOnMount: true })
    )

    unmount()
    jest.runAllTimers()

    expect(intervalHandler).toHaveBeenCalledTimes(0)
  })
})
