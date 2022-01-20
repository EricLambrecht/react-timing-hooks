import { render, act, fireEvent } from '@testing-library/react'
import { useTimeoutEffect } from '../.tmp/index'
import React, { useState } from 'react'
import { removeFlushTimers } from './helpers'

jest.useFakeTimers()

const TestComponent: React.FC = () => {
  const [output, setOutput] = useState('initial')
  const [output2, setOutput2] = useState('initial2')
  const [invokeTimeouts, setInvokeTimeouts] = useState(false)

  useTimeoutEffect(
    (timeout) => {
      if (invokeTimeouts) {
        timeout(() => {
          setOutput('foobar')
        }, 500)
        timeout(() => {
          setOutput2('n1m8')
        }, 1500)
      }
    },
    [invokeTimeouts]
  )

  return (
    <div>
      <p data-testid="output">{output}</p>
      <p data-testid="output-2">{output2}</p>
      <button
        data-testid="button"
        onClick={() => setInvokeTimeouts(true)}
      ></button>
    </div>
  )
}

describe('useTimeoutEffect() Integration Test', () => {
  it('works like a regular useEffect, except that it has a timeout function', () => {
    const { getByTestId } = render(<TestComponent />)

    act(() => {
      jest.runAllTimers()
    })
    expect(getByTestId('output').textContent).toBe('initial')
    expect(getByTestId('output-2').textContent).toBe('initial2')

    const button = getByTestId('button')
    fireEvent.click(button)

    act(() => {
      jest.runAllTimers()
    })
    expect(getByTestId('output').textContent).toBe('foobar')
    expect(getByTestId('output-2').textContent).toBe('n1m8')
  })

  it('will only create two timers and clean them up on unmount', async () => {
    const { unmount, getByTestId } = render(<TestComponent />)

    act(() => {
      jest.runAllTimers()
    })
    expect(jest.getTimerCount()).toBe(0)

    const button = getByTestId('button')
    fireEvent.click(button)

    removeFlushTimers()
    expect(jest.getTimerCount()).toBe(2)

    unmount()
    removeFlushTimers()
    expect(jest.getTimerCount()).toBe(0)
  })
})
