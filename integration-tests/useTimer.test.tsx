import { act, render } from '@testing-library/react'
import { useTimer } from '../.tmp/index'
import React from 'react'
import { removeFlushTimers } from './helpers'

jest.useFakeTimers()

const TestComponent: React.FC = () => {
  const timer = useTimer(100)

  return (
    <div>
      <p data-testid="output">{timer}</p>
    </div>
  )
}

describe('useTimer() Integration Test', () => {
  it('works as expected', () => {
    const { getByTestId, unmount } = render(<TestComponent />)

    expect(getByTestId('output').textContent).toBe('100')

    act(() => {
      jest.advanceTimersByTime(1000)
    })
    expect(getByTestId('output').textContent).toBe('101')
    act(() => {
      jest.advanceTimersByTime(4000)
    })
    expect(getByTestId('output').textContent).toBe('105')
    unmount()
    removeFlushTimers()
    expect(jest.getTimerCount()).toBe(0)
  })
})
