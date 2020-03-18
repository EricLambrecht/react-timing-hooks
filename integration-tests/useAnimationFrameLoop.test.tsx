import { render, act, fireEvent } from '@testing-library/react'
import React, { useState } from 'react'
import { useAnimationFrameLoop } from '../.tmp/index'
// @ts-ignore
import { animationFrame } from '@shopify/jest-dom-mocks'

const TestComponent: React.FC = () => {
  const [count, setCount] = useState(0)
  const [stop, setStop] = useState(false)

  useAnimationFrameLoop(() => {
    setCount(count + 1)
  }, stop)

  return (
    <div>
      <p data-testid="output">{count}</p>
      <button data-testid="button" onClick={() => setStop(!stop)}>
        Toggle Stop
      </button>
    </div>
  )
}

describe('useAnimationFrameLoop() Integration Test', () => {
  beforeAll(() => {
    animationFrame.mock()
  })

  afterAll(() => {
    animationFrame.restore()
  })

  it('increases the counter on every animation frame', () => {
    const { getByTestId } = render(<TestComponent />)

    for (let i = 1; i < 10; i++) {
      act(() => {
        animationFrame.runFrame()
      })
      expect(getByTestId('output').textContent).toBe(i.toString())
    }
  })

  it('stops increasing counter if stop is pressed, resumes after second click', () => {
    const { getByTestId } = render(<TestComponent />)

    for (let i = 1; i <= 10; i++) {
      act(() => {
        animationFrame.runFrame()
      })
      expect(getByTestId('output').textContent).toBe(i.toString())
    }

    fireEvent.click(getByTestId('button')) // stop

    for (let i = 11; i <= 20; i++) {
      act(() => {
        animationFrame.runFrame()
      })
      expect(getByTestId('output').textContent).toBe('10')
    }

    fireEvent.click(getByTestId('button')) // resume

    for (let i = 11; i <= 20; i++) {
      act(() => {
        animationFrame.runFrame()
      })
      expect(getByTestId('output').textContent).toBe(i.toString())
    }
  })
})
