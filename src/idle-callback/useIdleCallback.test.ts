import { renderHook } from '@testing-library/react'
import useIdleCallback from './useIdleCallback'
// @ts-ignore
import { ensureMocksReset, requestIdleCallback } from '@shopify/jest-dom-mocks'
import { useEffect } from 'react'
import * as logging from '../util/logging'

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

      renderHook(() => {
        const func = useIdleCallback(testCallback)
        useEffect(() => {
          func()
        }, [func])
      })

      expect(logWarningSpy).toHaveBeenCalledTimes(1)
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
