import { render, act, fireEvent } from '@testing-library/react'
import { useTimeout } from '../.tmp/index'
import React, { useState, useEffect } from 'react'
import { removeFlushTimers } from './helpers'

jest.useFakeTimers()

const TestComponent: React.FC = () => {
  const [output, setOutput] = useState('initial')
  const [invokeTimeout, setInvokeTimeout] = useState(false)

  const setOutputAfter500Ms = useTimeout(setOutput, 500)

  useEffect(() => {
    if (invokeTimeout) {
      setOutputAfter500Ms('foobar')
    }
  }, [invokeTimeout])

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

describe('useTimeout() Integration Test', () => {
  it('turns "setOutput" into a timeout function with 500ms delay', () => {
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
