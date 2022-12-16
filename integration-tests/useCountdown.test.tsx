import React, { useState } from 'react'
import { CountdownOptions, useCountdown } from '../.tmp'
import { fireEvent, render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { advanceTimersUsingAct } from '../src/testing/advanceTimersUsingAct'
import { removeFlushTimers } from './helpers'

const TestComponent: React.FC<{
  from: number
  to: number
  options?: CountdownOptions
}> = ({ from, to, options }) => {
  const [output, setOutput] = useState('Has not ended')

  const [counter, { isPaused, isStopped, pause, resume, stop, start }] =
    useCountdown(from, to, {
      onEnd: () => setOutput('Has ended'),
      ...options,
    })

  return (
    <div>
      <p data-testid="output">{output}</p>
      <p data-testid="counter">{counter}</p>
      <p data-testid="isPaused">{isPaused ? 'Yes' : 'No'}</p>
      <p data-testid="isStopped">{isStopped ? 'Yes' : 'No'}</p>
      <button data-testid="pause" onClick={pause}>
        Pause
      </button>
      <button data-testid="resume" onClick={resume}>
        Resume
      </button>
      <button data-testid="stop" onClick={stop}>
        Stop
      </button>
      <button data-testid="start" onClick={start}>
        Start
      </button>
    </div>
  )
}

describe('useCountdown() Integration Test', () => {
  beforeAll(() => {
    jest.useFakeTimers()
  })
  it('will end automatically', async () => {
    const { unmount } = render(<TestComponent from={10} to={0} />)
    //const counter = screen.getByTestId('counter')

    await advanceTimersUsingAct(1)
    expect(screen.queryByText('Has not ended')).toBeInTheDocument()
    expect(screen.getByTestId('counter')).toHaveTextContent(/^10$/)

    fireEvent.click(screen.getByRole('button', { name: 'Start' }))

    await advanceTimersUsingAct(1)
    expect(screen.getByTestId('counter')).toHaveTextContent(/^9$/)
    await advanceTimersUsingAct(4)
    expect(screen.getByTestId('counter')).toHaveTextContent(/^5$/)
    expect(screen.queryByText('Has not ended')).toBeInTheDocument()

    await advanceTimersUsingAct(8)
    expect(screen.getByTestId('counter')).toHaveTextContent(/^0$/)
    expect(screen.queryByText('Has not ended')).not.toBeInTheDocument()
    expect(screen.queryByText('Has ended')).toBeInTheDocument()

    unmount()
    removeFlushTimers()
  })
})
