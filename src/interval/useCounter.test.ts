import { renderHook } from '@testing-library/react'
import useCounter from './useCounter'
import { advanceTimersUsingAct } from '../testing/advanceTimersUsingAct'

describe('useCounter', () => {
  beforeAll(() => {
    jest.useFakeTimers()
  })

  it('is stopped on mount by default', async () => {
    const { result } = renderHook(() =>
      useCounter({ start: 1, interval: 500, stepSize: 2 })
    )
    expect(result.current[0]).toBe(1)
    await advanceTimersUsingAct(1, 500)
    expect(result.current[0]).toBe(1)
    await advanceTimersUsingAct(1, 500)
    expect(result.current[0]).toBe(1)
  })

  describe('if the counter is active', () => {
    const counterSettings = {
      start: 2,
      interval: 600,
      stepSize: 3,
      startOnMount: true,
    }
    it('it uses settings correctly', async () => {
      const { result } = renderHook(() => useCounter(counterSettings))
      let [value] = result.current
      expect(value).toBe(2)

      await advanceTimersUsingAct(1, 600)
      ;[value] = result.current
      expect(value).toBe(5)

      await advanceTimersUsingAct(1, 600)
      ;[value] = result.current
      expect(value).toBe(8)

      await advanceTimersUsingAct(2, 600)
      ;[value] = result.current
      expect(value).toBe(14)
    })

    it('it returns the intervals underlying controls', async () => {
      const { result } = renderHook(() => useCounter(counterSettings))
      const [, controls] = result.current
      expect(controls).toHaveProperty('isPaused')
      expect(controls).toHaveProperty('isStopped')
      expect(controls).toHaveProperty('pause')
      expect(controls).toHaveProperty('resume')
      expect(controls).toHaveProperty('start')
      expect(controls).toHaveProperty('stop')
    })
  })
})
