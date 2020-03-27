import { act, renderHook } from '@testing-library/react-hooks'
import useTimer from './useTimer'

describe('useTimer', () => {
  beforeAll(() => {
    jest.useFakeTimers()
  })

  it('counts up every second', () => {
    const { result } = renderHook(() => useTimer())
    expect(result.current).toBe(0)

    act(() => {
      jest.advanceTimersByTime(1000)
    })
    expect(result.current).toBe(1)

    act(() => {
      jest.advanceTimersByTime(1000)
    })
    expect(result.current).toBe(2)

    act(() => {
      jest.advanceTimersByTime(2000)
    })
    expect(result.current).toBe(4)
  })

  it('accepts start value', () => {
    const { result } = renderHook(() => useTimer(900))
    expect(result.current).toBe(900)

    act(() => {
      jest.advanceTimersByTime(1000)
    })
    expect(result.current).toBe(901)

    act(() => {
      jest.advanceTimersByTime(5000)
    })
    expect(result.current).toBe(906)
  })
})
