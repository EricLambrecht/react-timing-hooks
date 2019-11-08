import { renderHook } from '@testing-library/react-hooks'
import useAnimationFrame from './useAnimationFrame'
// @ts-ignore
import { ensureMocksReset, animationFrame } from '@shopify/jest-dom-mocks'
import { useEffect } from 'react'

describe('useAnimationFrame', () => {
  beforeAll(() => {
    animationFrame.mock()
  })

  afterAll(() => {
    animationFrame.restore()
    ensureMocksReset()
  })

  it('calls animation frame handler on next frame', () => {
    const testCallback = jest.fn()

    renderHook(() => {
      const func = useAnimationFrame(testCallback)
      useEffect(() => {
        func()
      }, [func])
    })

    animationFrame.runFrame()

    expect(testCallback).toHaveBeenCalledTimes(1)
  })

  it('properly cancels animation frame callback after unmount', () => {
    const testCallback = jest.fn()

    const { unmount } = renderHook(() => {
      const func = useAnimationFrame(testCallback)
      useEffect(() => {
        func()
      }, [func])
    })

    unmount()
    animationFrame.runFrame()

    expect(testCallback).toHaveBeenCalledTimes(0)
  })
})
