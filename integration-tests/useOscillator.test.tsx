import { render } from '@testing-library/react'
import { useOscillator } from '../.tmp/index'
import React from 'react'
import { removeFlushTimers } from './helpers'
import { advanceTimersUsingAct } from '../src/testing/advanceTimersUsingAct'

jest.useFakeTimers()

const TestComponent: React.FC = () => {
  const [isOn] = useOscillator({
    initialValue: false,
    startOnMount: true,
    interval: 1000,
  })

  return (
    <div>
      <p data-testid="output">{isOn ? 'ON' : 'OFF'}</p>
    </div>
  )
}

describe('useOscillator() Integration Test', () => {
  it('works as expected', async () => {
    const { getByTestId, unmount } = render(<TestComponent />)

    expect(getByTestId('output').textContent).toBe('OFF')

    await advanceTimersUsingAct(1, 1000)
    expect(getByTestId('output').textContent).toBe('ON')

    await advanceTimersUsingAct(1, 1000)
    expect(getByTestId('output').textContent).toBe('OFF')

    await advanceTimersUsingAct(1, 1000)
    expect(getByTestId('output').textContent).toBe('ON')

    unmount()
    removeFlushTimers()

    expect(jest.getTimerCount()).toBe(0)
  })
})
