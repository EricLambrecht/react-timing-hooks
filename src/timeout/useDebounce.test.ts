import { act, renderHook } from '@testing-library/react'
import { DebounceOptions, useDebounce } from './useDebounce'
import { useEffect } from 'react'
import { advanceTimersUsingAct } from '../testing/advanceTimersUsingAct'

describe('useDebounce', () => {
  let clearTimeoutSpy: jest.SpyInstance
  beforeAll(() => {
    jest.useFakeTimers()
    clearTimeoutSpy = jest.spyOn(global, 'clearTimeout')
  })

  beforeEach(() => {
    clearTimeoutSpy.mockClear()
  })

  it('calls timeout handler immediately if leading is true and trailing false', () => {
    const timeoutHandler = jest.fn()

    renderHook(() => {
      const func = useDebounce(timeoutHandler, 500, {
        leading: true,
        trailing: false,
      })
      useEffect(() => {
        func()
      }, [func])
    })

    expect(timeoutHandler).toHaveBeenCalledTimes(1)

    advanceTimersUsingAct(1, 500)

    expect(timeoutHandler).toHaveBeenCalledTimes(1)
  })

  it('calls timeout handler immediately and after the timeout if leading is true and trailing true', () => {
    const timeoutHandler = jest.fn()

    renderHook(() => {
      const func = useDebounce(timeoutHandler, 500, { leading: true }) // trailing: true is default
      useEffect(() => {
        func()
      }, [func])
    })

    expect(timeoutHandler).toHaveBeenCalledTimes(1)

    advanceTimersUsingAct(1, 500)

    expect(timeoutHandler).toHaveBeenCalledTimes(2)
  })

  it('Default: calls timeout handler after [n] milliseconds if options.trailing is set', () => {
    const timeoutHandler = jest.fn()

    renderHook(() => {
      const func = useDebounce(timeoutHandler, 500)
      useEffect(() => {
        func()
      }, [func])
    })

    expect(timeoutHandler).toHaveBeenCalledTimes(0) // do not fire immediately

    advanceTimersUsingAct(1, 500)

    expect(timeoutHandler).toHaveBeenCalledTimes(1)
  })

  describe('leading and trailing options', () => {
    const timeoutHandler = jest.fn()

    const renderTest = (options?: DebounceOptions) =>
      renderHook(
        ({ fakeProp }) => {
          const func = useDebounce(timeoutHandler, 500, options)
          useEffect(() => {
            func()
          }, [fakeProp])
        },
        { initialProps: { fakeProp: 1 } }
      )

    const advanceTimerAndRenderAndAssertNumberOfCalls = (
      ms: number,
      numCalls: number,
      rerender?: (p: { fakeProp: number }) => any
    ) => {
      advanceTimersUsingAct(1, ms)
      if (rerender) rerender({ fakeProp: Math.random() })
      expect(timeoutHandler).toHaveBeenCalledTimes(numCalls)
    }

    beforeEach(() => {
      timeoutHandler.mockClear()
    })

    it('will debounce correctly if leading: false, trailing: true (default)', () => {
      const { rerender } = renderTest()

      expect(timeoutHandler).toHaveBeenCalledTimes(0) // won't be called immediately

      advanceTimerAndRenderAndAssertNumberOfCalls(250, 0, rerender)
      advanceTimerAndRenderAndAssertNumberOfCalls(250, 0, rerender)
      advanceTimerAndRenderAndAssertNumberOfCalls(250, 0, rerender)
      advanceTimerAndRenderAndAssertNumberOfCalls(250, 0)
      advanceTimerAndRenderAndAssertNumberOfCalls(250, 1) // only now have 500ms passed without a call to func()

      rerender({ fakeProp: 4 })
      advanceTimersUsingAct(1, 250)
      expect(timeoutHandler).toHaveBeenCalledTimes(1)
    })

    it('will debounce correctly if leading: true, trailing: false', () => {
      const { rerender } = renderTest({ leading: true, trailing: false })

      expect(timeoutHandler).toHaveBeenCalledTimes(1) // will be called immediately

      advanceTimerAndRenderAndAssertNumberOfCalls(250, 1, rerender)
      advanceTimerAndRenderAndAssertNumberOfCalls(250, 1, rerender)
      advanceTimerAndRenderAndAssertNumberOfCalls(250, 1, rerender)
      advanceTimerAndRenderAndAssertNumberOfCalls(250, 1)
      advanceTimerAndRenderAndAssertNumberOfCalls(250, 1) // only now have 500ms passed without a call to func(), but trailing is false

      rerender({ fakeProp: 4 })
      advanceTimersUsingAct(1, 250)
      expect(timeoutHandler).toHaveBeenCalledTimes(2) // again, this is "immediate"
    })

    it('will debounce correctly if leading: true, trailing: true', () => {
      const { rerender } = renderTest({ leading: true, trailing: true })

      expect(timeoutHandler).toHaveBeenCalledTimes(1) // will be called immediately

      advanceTimerAndRenderAndAssertNumberOfCalls(250, 1, rerender)
      advanceTimerAndRenderAndAssertNumberOfCalls(250, 1, rerender)
      advanceTimerAndRenderAndAssertNumberOfCalls(250, 1, rerender)
      advanceTimerAndRenderAndAssertNumberOfCalls(250, 1)
      advanceTimerAndRenderAndAssertNumberOfCalls(250, 2) // trailing: true!

      rerender({ fakeProp: 4 })
      advanceTimersUsingAct(1, 250)
      expect(timeoutHandler).toHaveBeenCalledTimes(3) // again, this is "immediate"
      advanceTimerAndRenderAndAssertNumberOfCalls(250, 4)
    })
  })

  it('properly cleans up timeout after unmount', async () => {
    const timeoutHandler = jest.fn()

    const { unmount } = renderHook(() => {
      const func = useDebounce(timeoutHandler, 500)
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

    const { result } = renderHook(() => useDebounce(timeoutHandler, 500))
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
