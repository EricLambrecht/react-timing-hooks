import { act, renderHook } from '@testing-library/react'
import useTimeout from './useTimeout'
import { useEffect } from 'react'
import { advanceTimersUsingAct } from '../testing/advanceTimersUsingAct'

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

    expect(timeoutHandler).toHaveBeenCalledTimes(0) // do not fire immediately

    act(() => {
      jest.advanceTimersByTime(500)
    })

    expect(timeoutHandler).toHaveBeenCalledTimes(1)
  })

  it('will not debounce', () => {
    const timeoutHandler = jest.fn()

    const { rerender } = renderHook(
      ({ fakeProp }) => {
        const func = useTimeout(timeoutHandler, 500)
        useEffect(() => {
          func()
        }, [fakeProp])
      },
      { initialProps: { fakeProp: 1 } }
    )

    expect(timeoutHandler).toHaveBeenCalledTimes(0)

    advanceTimersUsingAct(1, 250)
    rerender({ fakeProp: 2 })
    expect(timeoutHandler).toHaveBeenCalledTimes(0)

    advanceTimersUsingAct(1, 250)
    rerender({ fakeProp: 3 })
    expect(timeoutHandler).toHaveBeenCalledTimes(1)

    advanceTimersUsingAct(1, 250)
    expect(timeoutHandler).toHaveBeenCalledTimes(2)

    advanceTimersUsingAct(1, 250)
    expect(timeoutHandler).toHaveBeenCalledTimes(3)
  })

  it('properly cleans up timeout after unmount', async () => {
    const timeoutHandler = jest.fn()

    const { unmount } = renderHook(() => {
      const func = useTimeout(timeoutHandler, 500)
      useEffect(() => {
        func()
      }, [func])
    })

    unmount()

    await act(() => {
      jest.runAllTimers()
    })

    expect(timeoutHandler).toHaveBeenCalledTimes(0)
  })

  it('returns the timeout id for manual clearance', async () => {
    const timeoutHandler = jest.fn()

    const { result } = renderHook(() => useTimeout(timeoutHandler, 500))
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

  it('timeout can be manually cleared', () => {
    const timeoutHandler = jest.fn()

    const { result } = renderHook(() => useTimeout(timeoutHandler, 500))
    let timeoutId
    act(() => {
      timeoutId = result.current()
    })
    expect(timeoutId).toEqual(expect.any(Number))
    clearTimeout(timeoutId)

    act(() => {
      jest.runAllTimers()
    })

    expect(timeoutHandler).toHaveBeenCalledTimes(0)
  })
})
