import { renderHook } from '@testing-library/react'
import useCountdown from './useCountdown'
import { advanceTimersUsingAct } from '../testing/advanceTimersUsingAct'

describe('useCountdown', () => {
  beforeAll(() => {
    jest.useFakeTimers()
  })

  describe('by default', () => {
    it('counts down every second', async () => {
      const { result } = renderHook(() =>
        useCountdown(0, -10, { startOnMount: true })
      )
      expect(result.current[0]).toBe(0)

      await advanceTimersUsingAct(1)
      expect(result.current[0]).toBe(-1)

      await advanceTimersUsingAct(1)
      expect(result.current[0]).toBe(-2)

      await advanceTimersUsingAct(2)
      expect(result.current[0]).toBe(-4)
    })

    it('call onEnd() event callback', async () => {
      const onEnd = jest.fn()
      const { result } = renderHook(() =>
        useCountdown(900, 897, { startOnMount: true, onEnd })
      )
      expect(result.current[0]).toBe(900)

      await advanceTimersUsingAct(1)
      expect(result.current[0]).toBe(899)

      expect(onEnd).toHaveBeenCalledTimes(0)

      await advanceTimersUsingAct(5)
      expect(result.current[0]).toBe(897) // will not go further, because that's the end

      expect(onEnd).toHaveBeenCalledTimes(1)
    })
  })
})
