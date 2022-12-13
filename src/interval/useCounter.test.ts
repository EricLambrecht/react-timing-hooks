import { renderHook } from '@testing-library/react'
import useCounter from './useCounter'
import { advanceTimersUsingAct } from '../testing/advanceTimersUsingAct'

describe('useCounter', () => {
  beforeAll(() => {
    jest.useFakeTimers()
  })

  describe('settings.start', () => {
    const timerSettings = { start: 2, interval: 600, stepSize: 3 }
    it('uses settings correctly', async () => {
      const { result } = renderHook(() => useCounter(timerSettings))
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
      const { result } = renderHook(() => useCounter(timerSettings))
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
