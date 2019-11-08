import { render, act } from '@testing-library/react'
import React, { useState } from 'react'
import { useAnimationFrameLoop } from '../.tmp/index'
// @ts-ignore
import { animationFrame } from '@shopify/jest-dom-mocks'

const TestComponent: React.FC = () => {
  const [count, setCount] = useState(0)

  useAnimationFrameLoop(() => {
    setCount(count + 1)
  })

  return (
    <div>
      <p data-testid="output">{count}</p>
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
})
