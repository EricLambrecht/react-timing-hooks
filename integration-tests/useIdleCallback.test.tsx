import { render, act, fireEvent } from '@testing-library/react'
import React, { useEffect, useState } from 'react'
import { useIdleCallback } from '../.tmp/index'
import { requestIdleCallback } from '@shopify/jest-dom-mocks'

requestIdleCallback.mock()

const TestComponent: React.FC = () => {
  const [output, setOutput] = useState('initial')
  const [invokeRequest, setInvokeRequest] = useState(false)

  const setOutputWhenIdle = useIdleCallback(setOutput)

  useEffect(() => {
    if (invokeRequest) {
      setOutputWhenIdle('foobar')
    }
  }, [invokeRequest])

  return (
    <div>
      <p data-testid="output">{output}</p>
      <button
        data-testid="button"
        onClick={() => setInvokeRequest(true)}
      ></button>
    </div>
  )
}

describe('useIdleCallback() Integration Test', () => {
  it('run the setOutout function as a idle callback function', () => {
    const { getByTestId } = render(<TestComponent />)

    act(() => {
      requestIdleCallback.runIdleCallbacks()
    })
    expect(getByTestId('output').textContent).toBe('initial')

    const button = getByTestId('button')
    fireEvent.click(button)

    act(() => {
      requestIdleCallback.runIdleCallbacks()
    })
    expect(getByTestId('output').textContent).toBe('foobar')
  })
})
