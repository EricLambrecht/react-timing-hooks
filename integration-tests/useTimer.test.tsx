import { render } from '@testing-library/react'
import { useTimer } from '../.tmp/index'
import React from 'react'
import { removeFlushTimers } from './helpers'
import { advanceTimersUsingAct } from '../src/testing/advanceTimersUsingAct'

jest.useFakeTimers()

const TestComponent: React.FC = () => {
  const [timer] = useTimer(100, { startOnMount: true })

  return (
    <div>
      <p data-testid="output">{timer}</p>
    </div>
  )
}

describe('useTimer() Integration Test', () => {
  it('works as expected', async () => {
    const { getByTestId, unmount } = render(<TestComponent />)

    expect(getByTestId('output').textContent).toBe('100')

    await advanceTimersUsingAct(1, 1000)
    expect(getByTestId('output').textContent).toBe('101')

    await advanceTimersUsingAct(4, 1000)
    expect(getByTestId('output').textContent).toBe('105')

    unmount()
    removeFlushTimers()

    expect(jest.getTimerCount()).toBe(0)
  })
})
