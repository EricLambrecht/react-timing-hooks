import useClock from './useClock'
import { renderHook } from '@testing-library/react'
import { advanceTimersUsingAct } from '../testing/advanceTimersUsingAct'

describe('useClock', () => {
  beforeAll(() => {
    jest.useFakeTimers()
  })

  it('displays/returns the correct time, every second', async () => {
    const testTimeInMilliseconds = 1642251554998 // Jan 15th 2022, 1:59:14 PM
    const { result } = renderHook(() =>
      useClock({ startTimeInMilliseconds: testTimeInMilliseconds })
    )
    expect(result.current[0]).toContain(':59:14')

    await advanceTimersUsingAct(1)
    expect(result.current[0]).toContain(':59:15')

    await advanceTimersUsingAct(1)
    expect(result.current[0]).toContain(':59:16')

    await advanceTimersUsingAct(2)
    expect(result.current[0]).toContain(':59:18')
  })

  it('supports changing locale', async () => {
    const testTimeInMilliseconds = 1642251554998 // Jan 15th 2022, 1:59:14 PM
    const { result } = renderHook(() =>
      useClock({
        startTimeInMilliseconds: testTimeInMilliseconds,
        dateTimeFormatOptions: { timeZone: 'UTC' },
        locales: 'fr-FR',
      })
    )
    expect(result.current[0]).toBe('12:59:14')

    await advanceTimersUsingAct(1)
    expect(result.current[0]).toBe('12:59:15')

    await advanceTimersUsingAct(1)
    expect(result.current[0]).toBe('12:59:16')

    await advanceTimersUsingAct(2)
    expect(result.current[0]).toBe('12:59:18')
  })

  it('supports custom dateTimeFormat options', async () => {
    const testTimeInMilliseconds = 1642251554998 // Jan 15th 2022, 1:59:14 PM
    const { result } = renderHook(() =>
      useClock({
        startTimeInMilliseconds: testTimeInMilliseconds,
        locales: 'en-EN',
        dateTimeFormatOptions: { timeZone: 'Asia/Tokyo' },
      })
    )
    expect(result.current[0]).toBe('9:59:14 PM')

    await advanceTimersUsingAct(1)
    expect(result.current[0]).toBe('9:59:15 PM')

    await advanceTimersUsingAct(1)
    expect(result.current[0]).toBe('9:59:16 PM')

    await advanceTimersUsingAct(2)
    expect(result.current[0]).toBe('9:59:18 PM')
  })

  it('supports custom formatting', async () => {
    const testTimeInMilliseconds = 1642251554998 // Jan 15th 2022, 1:59:14 PM
    const testFormatter = (date: Date) =>
      date.toLocaleTimeString('de-DE', { timeZone: 'Europe/Berlin' }) + 'foobar'
    const { result } = renderHook(() =>
      useClock({
        startTimeInMilliseconds: testTimeInMilliseconds,
        customFormatter: testFormatter,
      })
    )
    expect(result.current[0]).toBe('13:59:14foobar')

    await advanceTimersUsingAct(1)
    expect(result.current[0]).toBe('13:59:15foobar')

    await advanceTimersUsingAct(1)
    expect(result.current[0]).toBe('13:59:16foobar')

    await advanceTimersUsingAct(2)
    expect(result.current[0]).toBe('13:59:18foobar')
  })
})
