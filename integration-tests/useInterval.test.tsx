import { act, fireEvent, render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { IntervalOptions, useInterval } from '../.tmp/index'
import React, { useState } from 'react'
import { removeFlushTimers } from './helpers'
import { advanceTimersUsingAct } from '../src/testing/advanceTimersUsingAct'

jest.useFakeTimers()

const TestComponent: React.FC<{
  startDelay?: number
  options?: IntervalOptions
}> = ({ startDelay, options }) => {
  const [count, setCount] = useState(0)
  const [invokeInterval, setInvokeInterval] = useState(false)

  const { isPaused, isStopped, pause, resume, stop, start } = useInterval(
    () => {
      setCount(count + 1)
    },
    startDelay || (invokeInterval ? 500 : null),
    options
  )

  return (
    <div>
      <p data-testid="output">{count}</p>
      <p data-testid="isPaused">{isPaused ? 'Yes' : 'No'}</p>
      <p data-testid="isStopped">{isStopped ? 'Yes' : 'No'}</p>
      <button data-testid="pause" onClick={pause}></button>
      <button data-testid="resume" onClick={resume}></button>
      <button data-testid="stop" onClick={stop}></button>
      <button data-testid="start" onClick={start}></button>
      <button
        data-testid="button"
        onClick={() => setInvokeInterval(true)}
      ></button>
    </div>
  )
}

describe('useInterval() Integration Test', () => {
  it('will not start on mount if that is not enabled', async () => {
    const { unmount } = render(<TestComponent />)

    act(() => {
      jest.runAllTimers()
    })
    expect(screen.getByTestId('output')).toHaveTextContent('0')

    const button = screen.getByTestId('button')
    fireEvent.click(button)

    await advanceTimersUsingAct(1, 500)
    expect(screen.getByTestId('output')).toHaveTextContent('0')
    await advanceTimersUsingAct(4, 500)
    expect(screen.getByTestId('output')).toHaveTextContent('0')

    const start = screen.getByTestId('start')
    fireEvent.click(start)

    await advanceTimersUsingAct(3, 500)
    expect(screen.getByTestId('output')).toHaveTextContent('3')

    unmount()
    removeFlushTimers()
  })

  it('runs the handler function every time the delay has passed', async () => {
    const { unmount } = render(
      <TestComponent options={{ startOnMount: true }} />
    )

    act(() => {
      jest.runAllTimers()
    })
    expect(screen.getByTestId('output')).toHaveTextContent('0')

    const button = screen.getByTestId('button')
    fireEvent.click(button)

    await advanceTimersUsingAct(1, 500)
    expect(screen.getByTestId('output')).toHaveTextContent('1')
    await advanceTimersUsingAct(4, 500)
    expect(screen.getByTestId('output')).toHaveTextContent('5')
    unmount()
    removeFlushTimers()
  })

  it('will only create one interval and clean it up on unmount', async () => {
    const { unmount } = render(
      <TestComponent options={{ startOnMount: true }} />
    )

    removeFlushTimers()
    expect(jest.getTimerCount()).toBe(0)

    const button = screen.getByTestId('button')
    fireEvent.click(button)

    removeFlushTimers()
    expect(jest.getTimerCount()).toBe(1)

    unmount()
    removeFlushTimers()
    expect(jest.getTimerCount()).toBe(0)
  })

  it('can be paused and resumed', async () => {
    const { unmount } = render(
      <TestComponent startDelay={500} options={{ startOnMount: true }} />
    )

    expect(screen.getByTestId('output')).toHaveTextContent('0')
    expect(screen.getByTestId('isPaused')).toHaveTextContent('No')

    await advanceTimersUsingAct(1, 500)
    expect(screen.getByTestId('output')).toHaveTextContent('1')
    await advanceTimersUsingAct(1, 500)
    expect(screen.getByTestId('output')).toHaveTextContent('2')

    const pauseButton = screen.getByTestId('pause')
    fireEvent.click(pauseButton)
    expect(screen.getByTestId('isPaused')).toHaveTextContent('Yes')
    expect(screen.getByTestId('output')).toHaveTextContent('2')

    await advanceTimersUsingAct(1, 500)
    expect(screen.getByTestId('output')).toHaveTextContent('2')
    await advanceTimersUsingAct(1, 500)
    expect(screen.getByTestId('output')).toHaveTextContent('2')

    const resumeButton = screen.getByTestId('resume')
    fireEvent.click(resumeButton)
    expect(screen.getByTestId('isPaused')).toHaveTextContent('No')
    expect(screen.getByTestId('output')).toHaveTextContent('2')

    await advanceTimersUsingAct(1, 500)
    expect(screen.getByTestId('output')).toHaveTextContent('3')
    await advanceTimersUsingAct(1, 500)
    expect(screen.getByTestId('output')).toHaveTextContent('4')

    unmount()
    await advanceTimersUsingAct(1, 500)
    expect(screen.queryByTestId('output')).not.toBeInTheDocument()
    expect(jest.getTimerCount()).toBe(0)
  })

  it('can be stopped and (re)started', async () => {
    render(<TestComponent startDelay={500} options={{ startOnMount: true }} />)

    expect(screen.getByTestId('isStopped')).toHaveTextContent('No')

    await advanceTimersUsingAct(1, 500)
    expect(screen.getByTestId('output')).toHaveTextContent('1')
    expect(jest.getTimerCount()).toBe(1)

    const stopButton = screen.getByTestId('stop')
    fireEvent.click(stopButton)
    expect(jest.getTimerCount()).toBe(0)
    expect(screen.getByTestId('isStopped')).toHaveTextContent('Yes')
    expect(screen.getByTestId('output')).toHaveTextContent('1')

    await advanceTimersUsingAct(1, 500)
    expect(jest.getTimerCount()).toBe(0)
    expect(screen.getByTestId('isStopped')).toHaveTextContent('Yes')
    expect(screen.getByTestId('output')).toHaveTextContent('1')

    const startButton = screen.getByTestId('start')
    fireEvent.click(startButton)
    expect(screen.getByTestId('isStopped')).toHaveTextContent('No')
    expect(screen.getByTestId('output')).toHaveTextContent('1')

    await advanceTimersUsingAct(1, 500)
    expect(jest.getTimerCount()).toBe(1)
    expect(screen.getByTestId('isStopped')).toHaveTextContent('No')
    expect(screen.getByTestId('output')).toHaveTextContent('2')
  })
})
