import { renderHook } from '@testing-library/react-hooks'
import useIdleCallback from './useIdleCallback'
import { ensureMocksReset, requestIdleCallback } from '@shopify/jest-dom-mocks'
import { useEffect } from 'react'

describe('useIdleCallback', () => {
  beforeEach(() => {
    ensureMocksReset()
    if (requestIdleCallback.isMocked()) {
      requestIdleCallback.restore()
    }
    requestIdleCallback.mock()
  })

  beforeAll(() => {
    jest.useFakeTimers()
  })

  it("calls idle callback handler when the browser decides it's time", () => {
    const testCallback = jest.fn()

    renderHook(() => {
      const func = useIdleCallback(testCallback)
      useEffect(() => {
        func()
      }, [func])
    })

    requestIdleCallback.runIdleCallbacks()

    expect(testCallback).toHaveBeenCalledTimes(1)
  })

  it('properly cancels idle callback after unmount', () => {
    const testCallback = jest.fn()

    const { unmount } = renderHook(() => {
      const func = useIdleCallback(testCallback)
      useEffect(() => {
        func()
      }, [func])
    })

    unmount()
    requestIdleCallback.runIdleCallbacks()

    expect(testCallback).toHaveBeenCalledTimes(0)
  })

  describe('if requestIdleCallback is unsupported', () => {
    let realWarn: (message?: any, ...optionalParams: any[]) => void

    beforeEach(() => {
      if (requestIdleCallback.isMocked()) {
        requestIdleCallback.restore()
      }
      requestIdleCallback.mockAsUnsupported()

      realWarn = console.warn
      console.warn = jest.fn()
    })

    afterEach(() => {
      console.warn = realWarn
    })

    it('a warning is printed', () => {
      const testCallback = jest.fn()

      renderHook(() => {
        const func = useIdleCallback(testCallback)
        useEffect(() => {
          func()
        }, [func])
      })

      expect(console.warn).toHaveBeenCalledTimes(1)
    })

    it('the callback is run regardless (but immediately)', () => {
      const testCallback = jest.fn()

      renderHook(() => {
        const func = useIdleCallback(testCallback)
        useEffect(() => {
          func()
        }, [func])
      })

      expect(testCallback).toHaveBeenCalledTimes(1)
    })
  })
})
