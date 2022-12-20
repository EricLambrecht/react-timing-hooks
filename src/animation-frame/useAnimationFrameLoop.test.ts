// @ts-ignore
import { animationFrame, ensureMocksReset } from '@shopify/jest-dom-mocks'
import { renderHook, act } from '@testing-library/react'
import useAnimationFrameLoop from './useAnimationFrameLoop'
import { useEffect } from 'react'

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
      useAnimationFrameLoop(testCallback, { startOnMount: true })
    })

    expect(testCallback).toHaveBeenCalledTimes(0)

    for (let i = 1; i < 10; i++) {
      act(() => {
        animationFrame.runFrame()
      })
      expect(testCallback).toHaveBeenCalledTimes(i)
    }
  })

  it('is stopped on mount by default', () => {
    const testCallback = jest.fn()

    renderHook(() => {
      useAnimationFrameLoop(testCallback)
    })

    expect(testCallback).toHaveBeenCalledTimes(0)

    for (let i = 1; i < 10; i++) {
      act(() => {
        animationFrame.runFrame()
      })
      expect(testCallback).toHaveBeenCalledTimes(0)
    }
  })

  it('stops running when unmounted', () => {
    const testCallback = jest.fn()

    const { unmount } = renderHook(() => {
      useAnimationFrameLoop(testCallback, { startOnMount: true })
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

  it('can be paused and resumed via the returned controls', () => {
    const testCallback = jest.fn()

    const { rerender } = renderHook(
      (shouldPause: boolean) => {
        const { pause, resume } = useAnimationFrameLoop(testCallback, {
          startOnMount: true,
        })
        useEffect(() => {
          if (shouldPause) {
            pause()
          } else {
            resume()
          }
        }, [pause, resume, shouldPause])
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
        expect(testCallback).toHaveBeenCalledTimes(pauseOn) // if this value is higher, the loop did not pause!
      } else {
        expect(testCallback).toHaveBeenCalledTimes(i - pauseOn) // if this value is lower, it did not resume
      }
    }
  })
})
