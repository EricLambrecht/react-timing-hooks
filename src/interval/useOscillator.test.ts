import { renderHook } from '@testing-library/react'
import { advanceTimersUsingAct } from '../testing/advanceTimersUsingAct'
import useOscillator from './useOscillator'

describe('useOscillator', () => {
  beforeAll(() => {
    jest.useFakeTimers()
  })

  it('is stopped on mount by default', async () => {
    const { result } = renderHook(() =>
      useOscillator({ initialValue: true, interval: 500 })
    )
    expect(result.current[0]).toBe(true)
    await advanceTimersUsingAct(1, 500)
    expect(result.current[0]).toBe(true)
    await advanceTimersUsingAct(1, 500)
    expect(result.current[0]).toBe(true)
  })

  describe('if the oscillator is running', () => {
    const oscillatorSettings = {
      initialValue: true,
      interval: 600,
      stepSize: 3,
      startOnMount: true,
    }
    it('it uses settings correctly', async () => {
      const { result } = renderHook(() => useOscillator(oscillatorSettings))
      let [value] = result.current
      expect(value).toBe(true)

      await advanceTimersUsingAct(1, 600)
      ;[value] = result.current
      expect(value).toBe(false)

      await advanceTimersUsingAct(1, 600)
      ;[value] = result.current
      expect(value).toBe(true)

      await advanceTimersUsingAct(2, 600)
      ;[value] = result.current
      expect(value).toBe(true)

      await advanceTimersUsingAct(3, 600)
      ;[value] = result.current
      expect(value).toBe(false)
    })

    it('it returns the intervals underlying controls and a reset function', async () => {
      const { result } = renderHook(() => useOscillator(oscillatorSettings))
      const [, controls] = result.current
      expect(controls).toHaveProperty('isPaused')
      expect(controls).toHaveProperty('isStopped')
      expect(controls).toHaveProperty('pause')
      expect(controls).toHaveProperty('resume')
      expect(controls).toHaveProperty('start')
      expect(controls).toHaveProperty('stop')
      expect(controls).toHaveProperty('reset')
    })
  })
})
