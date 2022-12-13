import { renderHook } from '@testing-library/react'
import useCountdown from './useCountdown'
import { advanceTimersUsingAct } from '../testing/advanceTimersUsingAct'

describe('useCountdown', () => {
  beforeAll(() => {
    jest.useFakeTimers()
  })

  describe('by default', () => {
    it('counts down every second', async () => {
      const { result } = renderHook(() => useCountdown())
      expect(result.current).toBe(0)

      await advanceTimersUsingAct(1)
      expect(result.current).toBe(-1)

      await advanceTimersUsingAct(1)
      expect(result.current).toBe(-2)

      await advanceTimersUsingAct(2)
      expect(result.current).toBe(-4)
    })

    it('accepts start value', async () => {
      const { result } = renderHook(() => useCountdown(900))
      expect(result.current).toBe(900)

      await advanceTimersUsingAct(1)
      expect(result.current).toBe(899)

      await advanceTimersUsingAct(5)
      expect(result.current).toBe(894)
    })
  })
})
