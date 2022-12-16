import { renderHook } from '@testing-library/react'
import useTimer from './useTimer'
import { advanceTimersUsingAct } from '../testing/advanceTimersUsingAct'

describe('useTimer', () => {
  beforeAll(() => {
    jest.useFakeTimers()
  })

  describe('by default', () => {
    it('counts up every second', async () => {
      const { result } = renderHook(() =>
        useTimer(undefined, { startOnMount: true })
      )
      expect(result.current[0]).toBe(0)

      await advanceTimersUsingAct(1)
      expect(result.current[0]).toBe(1)

      await advanceTimersUsingAct(1)
      expect(result.current[0]).toBe(2)

      await advanceTimersUsingAct(2)
      expect(result.current[0]).toBe(4)
    })

    it('accepts start value', async () => {
      const { result } = renderHook(() => useTimer(900, { startOnMount: true }))
      expect(result.current[0]).toBe(900)

      await advanceTimersUsingAct(1)
      expect(result.current[0]).toBe(901)

      await advanceTimersUsingAct(5)
      expect(result.current[0]).toBe(906)
    })
  })
})
