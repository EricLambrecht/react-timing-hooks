import { render, fireEvent, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { useThrottledState, useInterval } from '../.tmp/index'
import React, { useState } from 'react'
import { removeFlushTimers } from './helpers'
import { advanceTimersUsingAct } from '../src/testing/advanceTimersUsingAct'

jest.useFakeTimers()

const TestComponent: React.FC = () => {
  const [count, setCount] = useState(0)
  const [throttledCount, setThrottledCount] = useThrottledState(0, 100)
  const [invokeInterval, setInvokeInterval] = useState(false)

  useInterval(
    () => {
      setCount(count + 1)
      setThrottledCount(count + 1)
    },
    invokeInterval ? 40 : null,
    { startOnMount: true }
  )

  return (
    <div>
      <p data-testid="output">{count}</p>
      <p data-testid="throttled-output">{throttledCount}</p>
      <button
        data-testid="button"
        onClick={() => setInvokeInterval(!invokeInterval)}
      ></button>
    </div>
  )
}

describe('useThrottledState() Integration Test', () => {
  it('runs the handler function every time the delay has passed', async () => {
    const { unmount } = render(<TestComponent />)

    // The interval and throttle starts after inital state set, i.e. 40 ms.
    const button = screen.getByTestId('button')
    fireEvent.click(button)
    await advanceTimersUsingAct(1, 40)
    // 0ms: setThrottledState(1)

    expect(screen.getByTestId('output')).toHaveTextContent('1')
    expect(screen.getByTestId('throttled-output')).toHaveTextContent('1')
    await advanceTimersUsingAct(2, 20)
    // 40ms: setThrottledState(2)
    expect(screen.getByTestId('output')).toHaveTextContent('2')
    expect(screen.getByTestId('throttled-output')).toHaveTextContent('1')
    await advanceTimersUsingAct(2, 20)
    // 80ms: setThrottledState(3)
    expect(screen.getByTestId('output')).toHaveTextContent('3')
    expect(screen.getByTestId('throttled-output')).toHaveTextContent('1')
    await advanceTimersUsingAct(2, 20)
    // 100ms: expect 3 to be set
    // 120ms: setThrottledState(4)
    expect(screen.getByTestId('output')).toHaveTextContent('4')
    expect(screen.getByTestId('throttled-output')).toHaveTextContent('3')
    await advanceTimersUsingAct(2, 20)
    // 160ms: setThrottledState(5)
    expect(screen.getByTestId('output')).toHaveTextContent('5')
    expect(screen.getByTestId('throttled-output')).toHaveTextContent('3')
    await advanceTimersUsingAct(2, 20)
    // 200ms: setThrottledState(6)
    expect(screen.getByTestId('output')).toHaveTextContent('6')
    expect(screen.getByTestId('throttled-output')).toHaveTextContent('6')
    await advanceTimersUsingAct(2, 20)
    // 240ms: setThrottledState(7)
    expect(screen.getByTestId('output')).toHaveTextContent('7')
    await advanceTimersUsingAct(1, 20)
    // 260ms: interval stopped
    fireEvent.click(button)
    expect(screen.getByTestId('throttled-output')).toHaveTextContent('6')
    await advanceTimersUsingAct(2, 20)
    // 300ms: nothing has been set. but 7 should be set now
    expect(screen.getByTestId('throttled-output')).toHaveTextContent('7')
    await advanceTimersUsingAct(2, 20)
    // 340ms: interval stopped
    await advanceTimersUsingAct(2, 20)
    // 380ms: interval stopped
    await advanceTimersUsingAct(2, 20)
    // 420ms: interval stopped
    expect(screen.getByTestId('throttled-output')).toHaveTextContent('7')
    fireEvent.click(button)
    await advanceTimersUsingAct(2, 20)
    // 460ms: setThrottledState(8) - restart updates to throttled count
    expect(screen.getByTestId('output')).toHaveTextContent('8')
    expect(screen.getByTestId('throttled-output')).toHaveTextContent('8')
    await advanceTimersUsingAct(2, 20)
    // 500ms: setThrottledState(9)
    expect(screen.getByTestId('output')).toHaveTextContent('9')
    expect(screen.getByTestId('throttled-output')).toHaveTextContent('8')
    await advanceTimersUsingAct(2, 20)
    // 540ms: setThrottledState(10)
    expect(screen.getByTestId('output')).toHaveTextContent('10')
    expect(screen.getByTestId('throttled-output')).toHaveTextContent('8')
    await advanceTimersUsingAct(1, 20)
    // 560ms: throttled state updated to 10
    expect(screen.getByTestId('output')).toHaveTextContent('10')
    expect(screen.getByTestId('throttled-output')).toHaveTextContent('10')
    await advanceTimersUsingAct(1, 20)
    // 580ms: setThrottledState(11)
    expect(screen.getByTestId('output')).toHaveTextContent('11')
    expect(screen.getByTestId('throttled-output')).toHaveTextContent('10')

    unmount()
    removeFlushTimers()
  })

  it('will only create one interval and clean it up on unmount', async () => {
    const { unmount } = render(<TestComponent />)

    unmount()
    removeFlushTimers()
    expect(jest.getTimerCount()).toBe(0)
  })
})
