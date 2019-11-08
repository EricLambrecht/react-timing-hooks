import { renderHook } from '@testing-library/react-hooks'
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
      useEffect(() => func(), [func])
    })

    jest.advanceTimersByTime(500)

    expect(timeoutHandler).toHaveBeenCalledTimes(1)
  })

  it('properly cleans up timeout after unmount', () => {
    const timeoutHandler = jest.fn()

    const { unmount } = renderHook(() => {
      const func = useTimeout(timeoutHandler, 500)
      useEffect(() => func(), [func])
    })

    unmount()
    jest.runAllTimers()

    expect(timeoutHandler).toHaveBeenCalledTimes(0)
  })
})
