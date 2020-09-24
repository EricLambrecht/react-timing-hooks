import { render, act, fireEvent } from '@testing-library/react'
import React, { useState } from 'react'
import { useIdleCallbackEffect } from '../.tmp/index'
// @ts-ignore
import { requestIdleCallback } from '@shopify/jest-dom-mocks'

requestIdleCallback.mock()

const TestComponent: React.FC = () => {
  const [output, setOutput] = useState('initial')
  const [invokeRequest, setInvokeRequest] = useState(false)

  useIdleCallbackEffect(
    (requestCallback) => {
      if (invokeRequest) {
        requestCallback(() => {
          setOutput('foobar')
        })
      }
    },
    [invokeRequest]
  )

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

describe('useIdleCallbackEffect() Integration Test', () => {
  it('works like a regular useEffect, except that it has a requestIdleCallback function', () => {
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
