// @ts-ignore
import { animationFrame, ensureMocksReset } from '@shopify/jest-dom-mocks'
import { renderHook, act } from '@testing-library/react-hooks'
import useAnimationFrameLoop from './useAnimationFrameLoop'

describe('useAnimationFrameLoop', () => {
  beforeAll(() => {
    animationFrame.mock()
  })

  afterAll(() => {
    animationFrame.restore()
    ensureMocksReset()
  })

  it('runs the callback one time on every frame', () => {
    const testCallback = jest.fn()

    renderHook(() => {
      useAnimationFrameLoop(testCallback)
    })

    expect(testCallback).toHaveBeenCalledTimes(0)

    for (let i = 1; i < 10; i++) {
      act(() => {
        animationFrame.runFrame()
      })
      expect(testCallback).toHaveBeenCalledTimes(i)
    }
  })

  it('stops running when unmounted', () => {
    const testCallback = jest.fn()

    const { unmount } = renderHook(() => {
      useAnimationFrameLoop(testCallback)
    })

    expect(testCallback).toHaveBeenCalledTimes(0)

    const unmountOn = 5

    for (let i = 1; i < 10; i++) {
      act(() => {
        animationFrame.runFrame()
      })
      if (i === unmountOn) {
        unmount()
      }
      if (i < unmountOn) {
        expect(testCallback).toHaveBeenCalledTimes(i)
      } else {
        expect(testCallback).toHaveBeenCalledTimes(unmountOn)
      }
    }
  })

  it('can be paused and resumed with second parameter', () => {
    const testCallback = jest.fn()

    const { rerender } = renderHook(
      (stop: boolean) => {
        useAnimationFrameLoop(testCallback, stop)
      },
      { initialProps: false }
    )

    expect(testCallback).toHaveBeenCalledTimes(0)

    const pauseOn = 3
    const resumeOn = 6

    for (let i = 1; i <= 10; i++) {
      act(() => {
        animationFrame.runFrame()
      })
      if (i === pauseOn) {
        rerender(true)
      }
      if (i === resumeOn) {
        rerender(false)
      }
      if (i < pauseOn) {
        expect(testCallback).toHaveBeenCalledTimes(i)
      } else if (i < resumeOn) {
        console.log(i)
        expect(testCallback).toHaveBeenCalledTimes(pauseOn)
      } else {
        expect(testCallback).toHaveBeenCalledTimes(i - pauseOn)
      }
    }
  })
})
