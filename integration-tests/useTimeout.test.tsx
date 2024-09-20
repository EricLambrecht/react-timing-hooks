import { screen, render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import { useTimeout } from '../.tmp/index'
import React, { act, useState } from 'react'
import { removeFlushTimers } from './helpers'
import { advanceTimersUsingAct } from '../src/testing/advanceTimersUsingAct'

const TestComponent: React.FC<{ delay: number }> = ({ delay }) => {
  const [count, setCount] = useState(0)

  const incrementCountAfter500Ms = useTimeout(
    () => setCount((c) => c + 1),
    delay
  )

  return (
    <div>
      <p data-testid="count">{count}</p>
      <button data-testid="button" onClick={incrementCountAfter500Ms}>
        Invoke Timeout
      </button>
    </div>
  )
}

describe('useTimeout() Integration Test', () => {
  beforeAll(() => {
    jest.useFakeTimers()
  })

  it('executes the callback after the delay without debouncing', async () => {
    render(<TestComponent delay={500} />)

    // Timer is not invoked yet
    await advanceTimersUsingAct(1, 1000)
    expect(screen.getByTestId('count')).toHaveTextContent(/^0$/)

    // Invoke it at 0ms
    const button = screen.getByRole('button')
    fireEvent.click(button)

    // Advance by 300ms
    await advanceTimersUsingAct(1, 300)
    expect(screen.getByTestId('count')).toHaveTextContent(/^0$/)

    // Click again after 300ms
    fireEvent.click(button)

    // Advance by 200ms (making a total of 500ms! First click should arrive)
    await advanceTimersUsingAct(1, 200)
    expect(screen.getByTestId('count')).toHaveTextContent(/^1$/)

    // Advance by 300ms (making a total of 800ms! Second click should arrive)
    await advanceTimersUsingAct(1, 300)
    expect(screen.getByTestId('count')).toHaveTextContent(/^2$/)
  })

  it('will only create one timer and clean it up on unmount', async () => {
    const { unmount } = render(<TestComponent delay={500} />)

    act(() => {
      jest.runAllTimers()
    })
    expect(jest.getTimerCount()).toBe(0)

    const button = screen.getByRole('button')
    fireEvent.click(button)

    removeFlushTimers()
    expect(jest.getTimerCount()).toBe(1)

    unmount()
    removeFlushTimers()
    expect(jest.getTimerCount()).toBe(0)
  })

  it('will only create one timer and clean it up on unmount', async () => {
    const { unmount } = render(<TestComponent delay={500} />)

    act(() => {
      jest.runAllTimers()
    })
    expect(jest.getTimerCount()).toBe(0)

    const button = screen.getByRole('button')
    fireEvent.click(button)

    removeFlushTimers()
    expect(jest.getTimerCount()).toBe(1)

    unmount()
    removeFlushTimers()
    expect(jest.getTimerCount()).toBe(0)
  })
})
