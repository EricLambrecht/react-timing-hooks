import useClock from './useClock'
import { act, renderHook } from '@testing-library/react-hooks'

describe('useClock', () => {
  beforeAll(() => {
    jest.useFakeTimers()
  })

  it('displays/returns the correct time, every second', () => {
    const testTimeInMilliseconds = 1642251554998 // Jan 15th 2022, 1:59:14 PM
    const { result } = renderHook(() => useClock(testTimeInMilliseconds))
    expect(result.current).toContain(':59:14 PM')

    act(() => {
      jest.advanceTimersByTime(1000)
    })
    expect(result.current).toContain(':59:15 PM')

    act(() => {
      jest.advanceTimersByTime(1000)
    })
    expect(result.current).toContain(':59:16 PM')

    act(() => {
      jest.advanceTimersByTime(2000) // 2(!) seconds
    })
    expect(result.current).toContain(':59:18 PM')
  })

  it('supports custom formatting', () => {
    const testTimeInMilliseconds = 1642251554998 // Jan 15th 2022, 1:59:14 PM
    const testFormatter = (date: Date) =>
      date.toLocaleTimeString('de-DE', { timeZone: 'Europe/Berlin' })
    const { result } = renderHook(() =>
      useClock(testTimeInMilliseconds, testFormatter)
    )
    expect(result.current).toBe('13:59:14')

    act(() => {
      jest.advanceTimersByTime(1000)
    })
    expect(result.current).toBe('13:59:15')

    act(() => {
      jest.advanceTimersByTime(1000)
    })
    expect(result.current).toBe('13:59:16')

    act(() => {
      jest.advanceTimersByTime(2000) // 2(!) seconds
    })
    expect(result.current).toBe('13:59:18')
  })
})
