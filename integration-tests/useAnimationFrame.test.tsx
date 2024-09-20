import { render, fireEvent } from '@testing-library/react'
import React, { act, useEffect, useState } from 'react'
import { useAnimationFrame } from '../.tmp/index'
// @ts-ignore
import { animationFrame } from '@shopify/jest-dom-mocks'

const TestComponent: React.FC = () => {
  const [output, setOutput] = useState('initial')
  const [invokeRequest, setInvokeRequest] = useState(false)

  const setOutputNextFrame = useAnimationFrame(setOutput)

  useEffect(() => {
    if (invokeRequest) {
      setOutputNextFrame('foobar')
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

describe('useAnimationFrame() Integration Test', () => {
  beforeAll(() => {
    animationFrame.mock()
  })

  afterAll(() => {
    animationFrame.restore()
  })

  it('run the setOutput only on next animation frame', () => {
    const { getByTestId } = render(<TestComponent />)

    act(() => {
      animationFrame.runFrame()
    })
    expect(getByTestId('output').textContent).toBe('initial')

    const button = getByTestId('button')
    fireEvent.click(button)

    act(() => {
      animationFrame.runFrame()
    })
    expect(getByTestId('output').textContent).toBe('foobar')
  })
})
