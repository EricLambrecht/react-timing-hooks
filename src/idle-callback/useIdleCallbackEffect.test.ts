import { renderHook } from '@testing-library/react'
import useIdleCallbackEffect from './useIdleCallbackEffect'
// @ts-ignore
import { ensureMocksReset, requestIdleCallback } from '@shopify/jest-dom-mocks'
import * as logging from '../util/logging'

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
    let logWarningSpy: jest.SpyInstance

    beforeEach(() => {
      if (requestIdleCallback.isMocked()) {
        requestIdleCallback.restore()
      }
      requestIdleCallback.mockAsUnsupported()

      logWarningSpy = jest.spyOn(logging, 'logWarning')
    })

    afterEach(() => {
      logWarningSpy.mockRestore()
    })

    it('a warning is printed', () => {
      const testCallback = jest.fn()

      renderHook(() =>
        useIdleCallbackEffect((requestIdleCallback) => {
          requestIdleCallback(testCallback)
        }, [])
      )

      expect(logWarningSpy).toHaveBeenCalledTimes(1)
    })
  })
})
