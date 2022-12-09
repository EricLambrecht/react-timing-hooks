import { renderHook } from '@testing-library/react'
import useTimeoutEffect from './useTimeoutEffect'

describe('useTimeoutEffect', () => {
  beforeAll(() => {
    jest.useFakeTimers()
  })

  it('calls timeout handler after [n] milliseconds', () => {
    const timeoutHandler = jest.fn()

    renderHook(() =>
      useTimeoutEffect((timeout) => {
        timeout(timeoutHandler, 500)
      }, [])
    )

    jest.advanceTimersByTime(500)

    expect(timeoutHandler).toHaveBeenCalledTimes(1)
  })

  it('properly cleans up timeout after unmount', () => {
    const timeoutHandler = jest.fn()

    const { unmount } = renderHook(() =>
      useTimeoutEffect((timeout) => {
        timeout(timeoutHandler, 500)
      }, [])
    )

    unmount()
    jest.runAllTimers()

    expect(timeoutHandler).toHaveBeenCalledTimes(0)
  })

  // Former bug: https://github.com/EricLambrecht/react-timing-hooks/issues/4
  it('properly cleans up multiple timeouts after unmount', () => {
    const timeoutHandler = jest.fn()
    const timeoutHandler2 = jest.fn()
    const timeoutHandler3 = jest.fn()

    const { unmount } = renderHook(() =>
      useTimeoutEffect((timeout) => {
        timeout(timeoutHandler, 500)
        timeout(timeoutHandler2, 500)
        timeout(timeoutHandler3, 500)
      }, [])
    )

    unmount()
    jest.runAllTimers()

    expect(timeoutHandler).toHaveBeenCalledTimes(0)
    expect(timeoutHandler2).toHaveBeenCalledTimes(0)
    expect(timeoutHandler3).toHaveBeenCalledTimes(0)
  })

  it('is executing cleanup function', () => {
    const onUnmount = jest.fn()

    const { unmount } = renderHook(() =>
      useTimeoutEffect(() => {
        return () => {
          onUnmount('success')
        }
      }, [])
    )

    unmount()
    jest.runAllTimers()

    expect(onUnmount).toHaveBeenCalledWith('success')
  })

  it('can be completely cleared manually', () => {
    const timeoutHandler = jest.fn()

    renderHook(() =>
      useTimeoutEffect((timeout, clearTimeout) => {
        timeout(timeoutHandler, 500)
        timeout(timeoutHandler, 500)
        clearTimeout()
      }, [])
    )

    jest.advanceTimersByTime(500)

    expect(timeoutHandler).toHaveBeenCalledTimes(0)
  })

  it('can be specifically cleared via id', () => {
    const timeoutHandler = jest.fn()

    renderHook(() =>
      useTimeoutEffect((timeout) => {
        const id = timeout(timeoutHandler, 500)
        timeout(timeoutHandler, 500)
        clearTimeout(id)
      }, [])
    )

    jest.advanceTimersByTime(500)

    expect(timeoutHandler).toHaveBeenCalledTimes(1)
  })
})
