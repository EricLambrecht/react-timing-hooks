import { act, fireEvent, render } from '@testing-library/react'
import { useInterval } from '../.tmp/index'
import React, { useState } from 'react'
import { removeFlushTimers } from './helpers'

jest.useFakeTimers()

const TestComponent: React.FC = () => {
  const [count, setCount] = useState(0)
  const [invokeInterval, setInvokeInterval] = useState(false)

  useInterval(
    () => {
      setCount(count + 1)
    },
    invokeInterval ? 500 : null
  )

  return (
    <div>
      <p data-testid="output">{count}</p>
      <button
        data-testid="button"
        onClick={() => setInvokeInterval(true)}
      ></button>
    </div>
  )
}

describe('useInterval() Integration Test', () => {
  it('runs the handler function every time the delay has passed', () => {
    const { getByTestId, unmount } = render(<TestComponent />)

    act(() => {
      jest.runAllTimers()
    })
    expect(getByTestId('output').textContent).toBe('0')

    const button = getByTestId('button')
    fireEvent.click(button)

    act(() => {
      jest.advanceTimersByTime(500)
    })
    expect(getByTestId('output').textContent).toBe('1')
    act(() => {
      jest.advanceTimersByTime(2000)
    })
    expect(getByTestId('output').textContent).toBe('5')
    unmount()
    removeFlushTimers()
  })

  it('will only create one interval and clean it up on unmount', async () => {
    const { unmount, getByTestId } = render(<TestComponent />)

    removeFlushTimers()
    expect(jest.getTimerCount()).toBe(0)

    const button = getByTestId('button')
    fireEvent.click(button)

    removeFlushTimers()
    expect(jest.getTimerCount()).toBe(1)

    unmount()
    removeFlushTimers()
    expect(jest.getTimerCount()).toBe(0)
  })
})
