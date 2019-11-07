import { render, act, fireEvent } from '@testing-library/react'
import { useTimeoutEffect } from '../.tmp/index'
import React, { useState } from 'react'
import { removeFlushTimers } from './helpers'

jest.useFakeTimers()

const TestComponent: React.FC = () => {
  const [output, setOutput] = useState('initial')
  const [invokeTimeout, setInvokeTimeout] = useState(false)

  useTimeoutEffect(
    timeout => {
      if (invokeTimeout) {
        timeout(() => {
          setOutput('foobar')
        }, 500)
      }
    },
    [invokeTimeout]
  )

  return (
    <div>
      <p data-testid="output">{output}</p>
      <button
        data-testid="button"
        onClick={() => setInvokeTimeout(true)}
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

    const button = getByTestId('button')
    fireEvent.click(button)

    act(() => {
      jest.runAllTimers()
    })
    expect(getByTestId('output').textContent).toBe('foobar')
  })

  it('will only create one timer and clean it up on unmount', async () => {
    const { unmount, getByTestId } = render(<TestComponent />)

    act(() => {
      jest.runAllTimers()
    })
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
