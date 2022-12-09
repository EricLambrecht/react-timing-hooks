import { renderHook } from '@testing-library/react'
import useIdleCallbackEffect from './useIdleCallbackEffect'
// @ts-ignore
import { ensureMocksReset, requestIdleCallback } from '@shopify/jest-dom-mocks'

describe('useIdleCallbackEffect', () => {
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

    renderHook(() =>
      useIdleCallbackEffect((requestIdleCallback) => {
        requestIdleCallback(testCallback)
      }, [])
    )

    requestIdleCallback.runIdleCallbacks()

    expect(testCallback).toHaveBeenCalledTimes(1)
  })

  it('properly cancels idle callback after unmount', () => {
    const testCallback = jest.fn()

    const { unmount } = renderHook(() =>
      useIdleCallbackEffect((requestIdleCallback) => {
        requestIdleCallback(testCallback)
      }, [])
    )

    unmount()
    requestIdleCallback.runIdleCallbacks()

    expect(testCallback).toHaveBeenCalledTimes(0)
  })

  it('is executing cleanup function', () => {
    const onUnmount = jest.fn()

    const { unmount } = renderHook(() =>
      useIdleCallbackEffect(() => {
        return () => {
          onUnmount('success')
        }
      }, [])
    )

    unmount()
    requestIdleCallback.runIdleCallbacks()

    expect(onUnmount).toHaveBeenCalledWith('success')
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

      renderHook(() =>
        useIdleCallbackEffect((requestIdleCallback) => {
          requestIdleCallback(testCallback)
        }, [])
      )

      expect(console.warn).toHaveBeenCalledTimes(1)
    })
  })
})
