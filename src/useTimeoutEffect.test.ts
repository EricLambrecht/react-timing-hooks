import { renderHook } from '@testing-library/react-hooks'
import useTimeoutEffect from './useTimeoutEffect'

describe('useTimeoutEffect', () => {
  beforeAll(() => {
    jest.useFakeTimers()
  })

  it('calls timeout handler after [n] milliseconds', () => {
    const timeoutHandler = jest.fn()

    renderHook(() =>
      useTimeoutEffect(timeout => {
        timeout(timeoutHandler, 500)
      }, [])
    )

    jest.advanceTimersByTime(500)

    expect(timeoutHandler).toHaveBeenCalledTimes(1)
  })

  it('properly cleans up timeout after unmount', () => {
    const timeoutHandler = jest.fn()

    const { unmount } = renderHook(() =>
      useTimeoutEffect(timeout => {
        timeout(timeoutHandler, 500)
      }, [])
    )

    unmount()
    jest.runAllTimers()

    expect(timeoutHandler).toHaveBeenCalledTimes(0)
  })
})
