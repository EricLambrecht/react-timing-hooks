import { act, renderHook } from '@testing-library/react'
import { ThrottleOptions, useThrottle } from './useThrottle'
import { useEffect } from 'react'
import { advanceTimersUsingAct } from '../testing/advanceTimersUsingAct'

describe('useThrottle', () => {
  let clearTimeoutSpy: jest.SpyInstance
  beforeAll(() => {
    jest.useFakeTimers()
    clearTimeoutSpy = jest.spyOn(global, 'clearTimeout')
  })

  beforeEach(() => {
    clearTimeoutSpy.mockClear()
  })

  it('it calls the throttled callback immediately and only once with default settings', () => {
    const timeoutHandler = jest.fn()

    renderHook(() => {
      const func = useThrottle(timeoutHandler, 500)
      useEffect(() => {
        func()
      }, [func])
    })

    expect(timeoutHandler).toHaveBeenCalledTimes(1)

    advanceTimersUsingAct(1, 500)

    expect(timeoutHandler).toHaveBeenCalledTimes(1)
  })

  it('calls timeout handler only after timeout if leading is false', () => {
    const timeoutHandler = jest.fn()

    renderHook(() => {
      const func = useThrottle(timeoutHandler, 500, { leading: false }) // trailing: true is default
      useEffect(() => {
        func()
      }, [func])
    })

    expect(timeoutHandler).toHaveBeenCalledTimes(0)

    advanceTimersUsingAct(1, 500)

    expect(timeoutHandler).toHaveBeenCalledTimes(1)
  })

  it('does not call timeout if both leading and trailing are false', () => {
    const timeoutHandler = jest.fn()

    renderHook(() => {
      const func = useThrottle(timeoutHandler, 500, {
        leading: false,
        trailing: false,
      })
      useEffect(() => {
        func()
      }, [func])
    })

    expect(timeoutHandler).toHaveBeenCalledTimes(0)
    advanceTimersUsingAct(1, 500)
    expect(timeoutHandler).toHaveBeenCalledTimes(0)
  })

  describe('leading and trailing options', () => {
    const timeoutHandler = jest.fn()

    const renderTest = (options?: ThrottleOptions) =>
      renderHook(
        ({ fakeProp }) => {
          const func = useThrottle(timeoutHandler, 500, options)
          useEffect(() => {
            func(fakeProp)
          }, [fakeProp])
        },
        { initialProps: { fakeProp: 1 } }
      )

    const advanceTimerThenCallAndAssertNumberOfInvocations = (
      ms: number,
      numCalls: number,
      lastCalledWith: number | null,
      rerender?: () => any
    ) => {
      advanceTimersUsingAct(1, ms)
      if (rerender) rerender()
      expect(timeoutHandler).toHaveBeenCalledTimes(numCalls)
      if (lastCalledWith) {
        expect(timeoutHandler).toHaveBeenLastCalledWith(lastCalledWith)
      }
    }

    beforeEach(() => {
      timeoutHandler.mockClear()
    })

    it('will throttle correctly if leading: true, trailing: true (default)', () => {
      const { rerender } = renderTest({ leading: true, trailing: true })
      const attempt = (n: number) => () => rerender({ fakeProp: n })

      // 0ms
      expect(timeoutHandler).toHaveBeenCalledTimes(1) // leading call
      advanceTimerThenCallAndAssertNumberOfInvocations(100, 1, 1, attempt(2))
      advanceTimerThenCallAndAssertNumberOfInvocations(100, 1, 1)
      advanceTimerThenCallAndAssertNumberOfInvocations(100, 1, 1)
      advanceTimerThenCallAndAssertNumberOfInvocations(100, 1, 1, attempt(3))
      // 400ms to 500ms
      advanceTimerThenCallAndAssertNumberOfInvocations(100, 2, 3) // trailing call
      advanceTimerThenCallAndAssertNumberOfInvocations(100, 2, 3)
      advanceTimerThenCallAndAssertNumberOfInvocations(100, 2, 3, attempt(4))
      advanceTimerThenCallAndAssertNumberOfInvocations(100, 2, 3, attempt(5))
      advanceTimerThenCallAndAssertNumberOfInvocations(100, 2, 3, attempt(6))
      // 900 to 1000ms
      advanceTimerThenCallAndAssertNumberOfInvocations(100, 3, 6) // trailing call
      advanceTimerThenCallAndAssertNumberOfInvocations(100, 3, 6, attempt(7))
      advanceTimerThenCallAndAssertNumberOfInvocations(100, 3, 6)
      advanceTimerThenCallAndAssertNumberOfInvocations(100, 3, 6, attempt(8))
      advanceTimerThenCallAndAssertNumberOfInvocations(100, 3, 6)
      // 1400ms to 1500ms
      advanceTimerThenCallAndAssertNumberOfInvocations(100, 4, 8) // trailing call
      advanceTimerThenCallAndAssertNumberOfInvocations(100, 4, 8)
      advanceTimerThenCallAndAssertNumberOfInvocations(100, 4, 8)
      advanceTimerThenCallAndAssertNumberOfInvocations(100, 4, 8)
      advanceTimerThenCallAndAssertNumberOfInvocations(100, 4, 8)
      // 1900ms to 2000ms
      advanceTimerThenCallAndAssertNumberOfInvocations(100, 4, 8)
      advanceTimerThenCallAndAssertNumberOfInvocations(100, 4, 8)
      advanceTimerThenCallAndAssertNumberOfInvocations(100, 4, 8)
      advanceTimerThenCallAndAssertNumberOfInvocations(100, 4, 8)
      advanceTimerThenCallAndAssertNumberOfInvocations(100, 4, 8)
      // 2400ms to 2500ms
      advanceTimerThenCallAndAssertNumberOfInvocations(100, 4, 8)
    })

    it('will throttle correctly if leading: false, trailing: true', () => {
      const { rerender } = renderTest({ leading: false, trailing: true })
      const attempt = (n: number) => () => rerender({ fakeProp: n })

      // 0ms
      expect(timeoutHandler).toHaveBeenCalledTimes(0) // leading call
      advanceTimerThenCallAndAssertNumberOfInvocations(100, 0, null)
      advanceTimerThenCallAndAssertNumberOfInvocations(100, 0, null)
      advanceTimerThenCallAndAssertNumberOfInvocations(100, 0, null, attempt(3))
      advanceTimerThenCallAndAssertNumberOfInvocations(100, 0, null)
      // 400ms to 500ms
      advanceTimerThenCallAndAssertNumberOfInvocations(100, 1, 3) // trailing call
      advanceTimerThenCallAndAssertNumberOfInvocations(100, 1, 3)
      advanceTimerThenCallAndAssertNumberOfInvocations(100, 1, 3, attempt(4))
      advanceTimerThenCallAndAssertNumberOfInvocations(100, 1, 3, attempt(5))
      advanceTimerThenCallAndAssertNumberOfInvocations(100, 1, 3, attempt(6))
      // 900 to 1000ms
      advanceTimerThenCallAndAssertNumberOfInvocations(100, 2, 6) // trailing call
      advanceTimerThenCallAndAssertNumberOfInvocations(100, 2, 6, attempt(7))
      advanceTimerThenCallAndAssertNumberOfInvocations(100, 2, 6)
      advanceTimerThenCallAndAssertNumberOfInvocations(100, 2, 6, attempt(8))
      advanceTimerThenCallAndAssertNumberOfInvocations(100, 2, 6)
      // 1400ms to 1500ms
      advanceTimerThenCallAndAssertNumberOfInvocations(100, 3, 8) // trailing call
      advanceTimerThenCallAndAssertNumberOfInvocations(100, 3, 8)
      advanceTimerThenCallAndAssertNumberOfInvocations(100, 3, 8)
      advanceTimerThenCallAndAssertNumberOfInvocations(100, 3, 8)
      advanceTimerThenCallAndAssertNumberOfInvocations(100, 3, 8)
      // 1900ms to 2000ms
      advanceTimerThenCallAndAssertNumberOfInvocations(100, 3, 8)
      advanceTimerThenCallAndAssertNumberOfInvocations(100, 3, 8)
      advanceTimerThenCallAndAssertNumberOfInvocations(100, 3, 8)
      advanceTimerThenCallAndAssertNumberOfInvocations(100, 3, 8)
      advanceTimerThenCallAndAssertNumberOfInvocations(100, 3, 8)
      // 2400ms to 2500ms
      advanceTimerThenCallAndAssertNumberOfInvocations(100, 3, 8)
    })

    it('will throttle correctly if leading: true, trailing: false', () => {
      const { rerender } = renderTest({ leading: true, trailing: false })
      const attempt = (n: number) => () => rerender({ fakeProp: n })

      // 0ms
      expect(timeoutHandler).toHaveBeenCalledTimes(1) // leading call
      advanceTimerThenCallAndAssertNumberOfInvocations(100, 1, 1, attempt(2))
      advanceTimerThenCallAndAssertNumberOfInvocations(100, 1, 1)
      advanceTimerThenCallAndAssertNumberOfInvocations(100, 1, 1)
      advanceTimerThenCallAndAssertNumberOfInvocations(100, 1, 1, attempt(3))
      // 400ms to 500ms
      advanceTimerThenCallAndAssertNumberOfInvocations(100, 1, 1) // timeout over
      advanceTimerThenCallAndAssertNumberOfInvocations(100, 1, 1)
      advanceTimerThenCallAndAssertNumberOfInvocations(100, 2, 4, attempt(4)) // leading
      advanceTimerThenCallAndAssertNumberOfInvocations(100, 2, 4, attempt(5))
      advanceTimerThenCallAndAssertNumberOfInvocations(100, 2, 4, attempt(6))
      // 900 to 1000ms
      advanceTimerThenCallAndAssertNumberOfInvocations(100, 2, 4)
      advanceTimerThenCallAndAssertNumberOfInvocations(100, 2, 4, attempt(7))
      advanceTimerThenCallAndAssertNumberOfInvocations(100, 2, 4) // timeout over
      advanceTimerThenCallAndAssertNumberOfInvocations(100, 3, 8, attempt(8)) // leading
      advanceTimerThenCallAndAssertNumberOfInvocations(100, 3, 8)
      // 1400ms to 1500ms
      advanceTimerThenCallAndAssertNumberOfInvocations(100, 3, 8)
      advanceTimerThenCallAndAssertNumberOfInvocations(100, 3, 8)
      advanceTimerThenCallAndAssertNumberOfInvocations(100, 3, 8)
      advanceTimerThenCallAndAssertNumberOfInvocations(100, 3, 8)
      advanceTimerThenCallAndAssertNumberOfInvocations(100, 3, 8)
      // 1900ms to 2000ms
      advanceTimerThenCallAndAssertNumberOfInvocations(100, 3, 8)
      advanceTimerThenCallAndAssertNumberOfInvocations(100, 3, 8)
      advanceTimerThenCallAndAssertNumberOfInvocations(100, 3, 8)
      advanceTimerThenCallAndAssertNumberOfInvocations(100, 3, 8)
      advanceTimerThenCallAndAssertNumberOfInvocations(100, 3, 8)
      // 2400ms to 2500ms
      advanceTimerThenCallAndAssertNumberOfInvocations(100, 3, 8)
    })
  })

  it('properly cleans up timeout after unmount', async () => {
    const timeoutHandler = jest.fn()

    const { unmount } = renderHook(() => {
      const func = useThrottle(timeoutHandler, 500)
      useEffect(() => {
        func()
      }, [func])
    })

    unmount()

    await act(() => {
      jest.runAllTimers()
    })

    expect(clearTimeoutSpy).toHaveBeenCalledTimes(1)
  })

  it('returns the timeout id for manual clearance', async () => {
    const timeoutHandler = jest.fn()

    const { result } = renderHook(() => useThrottle(timeoutHandler, 500))
    expect(result.current).toBeInstanceOf(Function)

    let timeoutId
    await act(() => {
      timeoutId = result.current()
    })
    expect(timeoutId).toEqual(expect.any(Number))

    await act(() => {
      jest.runAllTimers()
    })

    expect(timeoutHandler).toHaveBeenCalledTimes(1)
  })
})
