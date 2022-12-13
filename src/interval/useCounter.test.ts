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
      expect(result.current).toBe(2)

      await advanceTimersUsingAct(1, 600)
      expect(result.current).toBe(5)

      await advanceTimersUsingAct(1, 600)
      expect(result.current).toBe(8)

      await advanceTimersUsingAct(2, 600)
      expect(result.current).toBe(14)
    })
  })
})
