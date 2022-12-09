import { renderHook } from '@testing-library/react'
import useTimeout from './useTimeout'
import { useEffect } from 'react'

describe('useTimeout', () => {
  beforeAll(() => {
    jest.useFakeTimers()
  })

  it('calls timeout handler after [n] milliseconds', () => {
    const timeoutHandler = jest.fn()

    renderHook(() => {
      const func = useTimeout(timeoutHandler, 500)
      useEffect(() => {
        func()
      }, [func])
    })

    jest.advanceTimersByTime(500)

    expect(timeoutHandler).toHaveBeenCalledTimes(1)
  })

  it('properly cleans up timeout after unmount', () => {
    const timeoutHandler = jest.fn()

    const { unmount } = renderHook(() => {
      const func = useTimeout(timeoutHandler, 500)
      useEffect(() => {
        func()
      }, [func])
    })

    unmount()
    jest.runAllTimers()

    expect(timeoutHandler).toHaveBeenCalledTimes(0)
  })

  it('returns the timeout id for manual clearance', () => {
    const timeoutHandler = jest.fn()

    const { unmount, result } = renderHook(() =>
      useTimeout(timeoutHandler, 500)
    )
    expect(result.current).toBeInstanceOf(Function)
    expect(result.current()).toEqual(expect.any(Number))

    unmount()
    jest.runAllTimers()

    expect(timeoutHandler).toHaveBeenCalledTimes(1)
  })

  it('timeout can be manually cleared', () => {
    const timeoutHandler = jest.fn()

    const { unmount, result } = renderHook(() =>
      useTimeout(timeoutHandler, 500)
    )
    const timeoutId = result.current()
    expect(timeoutId).toEqual(expect.any(Number))
    clearTimeout(timeoutId)

    unmount()
    jest.runAllTimers()

    expect(timeoutHandler).toHaveBeenCalledTimes(0)
  })
})
