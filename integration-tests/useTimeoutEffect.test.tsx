import { render, act } from '@testing-library/react'
import { useTimeoutEffect } from '../dist/index'
import React, { useState } from 'react'

interface Props {
  invokeTimeout: boolean
}
const TestComponent: React.FC<Props> = props => {
  const [output, setOutput] = useState('initial')

  useTimeoutEffect(timeout => {
    if (props.invokeTimeout) {
      timeout(() => setOutput('foobar'), 500)
    }
  }, [props.invokeTimeout])

  return <p data-testid="output">{output}</p>
}

describe('useTimeoutEffect() Integration Test', () => {
  it('works like a regular useEffect, except that it has a timeout function', () => {
    jest.useFakeTimers()
    const { rerender, getByTestId } = render(<TestComponent invokeTimeout={false}/>)

    act(() => {
      jest.runAllTimers()
    })
    expect(getByTestId('output').textContent).toBe('initial')

    rerender(<TestComponent invokeTimeout={true}/>)
    act(() => {
      jest.runAllTimers()
    })
    expect(getByTestId('output').textContent).toBe('foobar')
  })

  it('will only create one timer and clean it up on unmount', () => {
    jest.useFakeTimers()
    const { rerender, unmount } = render(<TestComponent invokeTimeout={false}/>)

    act(() => {
      jest.runAllTimers()
    })
    expect(jest.getTimerCount()).toBe(0)

    rerender(<TestComponent invokeTimeout={true}/>)
    expect(jest.getTimerCount()).toBe(1)
    unmount()
    expect(jest.getTimerCount()).toBe(0)
  })
})
