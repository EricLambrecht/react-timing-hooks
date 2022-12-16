import { render } from '@testing-library/react'
import React from 'react'
import { removeFlushTimers } from './helpers'
import { useClock } from '../.tmp/index'
import { advanceTimersUsingAct } from '../src/testing/advanceTimersUsingAct'

jest.useFakeTimers()

const TestComponent: React.FC = () => {
  const [time] = useClock()

  return (
    <div>
      <p data-testid="output">{time}</p>
    </div>
  )
}

describe('useClock() Integration Test', () => {
  const getSecondsFromFormattedTime = (formattedTime: string | null) => {
    const matchArray = formattedTime?.match(/(\d+)/g)
    if (matchArray && matchArray.length > 0) {
      return Number.parseInt(matchArray.pop()!)
    }
    return 0
  }
  it('displays a time string which is updated every second', async () => {
    const { getByTestId, unmount } = render(<TestComponent />)

    const secondsAtTestStart = getSecondsFromFormattedTime(
      getByTestId('output').textContent
    )

    await advanceTimersUsingAct(1)
    expect(getSecondsFromFormattedTime(getByTestId('output').textContent)).toBe(
      (secondsAtTestStart + 1) % 60
    )
    await advanceTimersUsingAct(1)
    expect(getSecondsFromFormattedTime(getByTestId('output').textContent)).toBe(
      (secondsAtTestStart + 2) % 60
    )
    await advanceTimersUsingAct(4)
    expect(getSecondsFromFormattedTime(getByTestId('output').textContent)).toBe(
      (secondsAtTestStart + 6) % 60
    )
    unmount()
    removeFlushTimers()
    expect(jest.getTimerCount()).toBe(0)
  })
})
