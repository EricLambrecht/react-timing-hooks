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
        useCountdown(0, { startOnMount: true })
      )
      let [value] = result.current
      expect(value).toBe(0)

      await advanceTimersUsingAct(1)
      ;[value] = result.current
      expect(value).toBe(-1)

      await advanceTimersUsingAct(1)
      ;[value] = result.current
      expect(value).toBe(-2)

      await advanceTimersUsingAct(2)
      ;[value] = result.current
      expect(value).toBe(-4)
    })

    it('accepts start value', async () => {
      const { result } = renderHook(() =>
        useCountdown(900, { startOnMount: true })
      )
      let [value] = result.current
      expect(value).toBe(900)

      await advanceTimersUsingAct(1)
      ;[value] = result.current
      expect(value).toBe(899)

      await advanceTimersUsingAct(5)
      ;[value] = result.current
      expect(value).toBe(894)
    })
  })
})
