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
      let [value] = result.current
      expect(value).toBe(0)

      await advanceTimersUsingAct(1)
      ;[value] = result.current
      expect(value).toBe(1)

      await advanceTimersUsingAct(1)
      ;[value] = result.current
      expect(value).toBe(2)

      await advanceTimersUsingAct(2)
      ;[value] = result.current
      expect(value).toBe(4)
    })

    it('accepts start value', async () => {
      const { result } = renderHook(() => useTimer(900, { startOnMount: true }))
      let [value] = result.current
      expect(value).toBe(900)

      await advanceTimersUsingAct(1)
      ;[value] = result.current
      expect(value).toBe(901)

      await advanceTimersUsingAct(5)
      ;[value] = result.current
      expect(value).toBe(906)
    })
  })
})
