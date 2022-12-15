import { render, act, fireEvent, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import React, { useCallback, useEffect, useState } from 'react'
import { useAnimationFrameLoop } from '../.tmp/index'
// @ts-ignore
import { animationFrame } from '@shopify/jest-dom-mocks'

jest.useRealTimers()

const TestComponent: React.FC = () => {
  const [count, setCount] = useState(0)
  const [stop, setStop] = useState(false)

  const { pause, resume } = useAnimationFrameLoop(
    () => {
      setCount(count + 1)
    },
    { startOnMount: true }
  )

  useEffect(() => {
    if (stop) {
      pause()
    } else {
      resume()
    }
  }, [pause, resume, stop])

  return (
    <div>
      <p data-testid="output">{count}</p>
      <button onClick={() => setStop(!stop)}>Toggle Stop</button>
    </div>
  )
}

describe('useAnimationFrameLoop() Integration Test', () => {
  describe('with mocked animation frame', () => {
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

      fireEvent.click(screen.getByRole('button', { name: 'Toggle Stop' })) // stop

      for (let i = 11; i <= 20; i++) {
        act(() => {
          animationFrame.runFrame()
        })
        expect(getByTestId('output').textContent).toBe('10')
      }

      fireEvent.click(screen.getByRole('button', { name: 'Toggle Stop' })) // resume

      for (let i = 11; i <= 20; i++) {
        act(() => {
          animationFrame.runFrame()
        })
        expect(getByTestId('output').textContent).toBe(i.toString())
      }
    })
  })

  describe('Github issue #25: Infinite rerender bug', () => {
    const UnnecessaryRerenderTest: React.FC<{
      onRender: jest.Mock
      pausedOnStartup: boolean
    }> = ({ onRender, pausedOnStartup }) => {
      const [count, setCount] = useState(0)
      const incrementCount = useCallback(() => {
        setCount(count + 1)
      }, [setCount])

      const { pause, resume, isPaused } = useAnimationFrameLoop(
        incrementCount,
        { startOnMount: pausedOnStartup }
      )

      onRender(isPaused)

      return (
        <>
          <p data-testid="output">{count}</p>
          <button data-testid="button" onClick={isPaused ? resume : pause}>
            Toggle Pause
          </button>
        </>
      )
    }

    it('does not cause an infinite render loop when paused on startup', async () => {
      const renderMock = jest.fn()
      render(<UnnecessaryRerenderTest onRender={renderMock} pausedOnStartup />)
      const promise = new Promise<void>((r) => setTimeout(r, 500))
      await act(() => promise)
      const maxNumberOfCalls = 3
      expect(renderMock.mock.calls.length).toBeLessThan(maxNumberOfCalls) // 1 for the hook and 1 for the act()
    })

    it('does not cause an infinite render loop when paused is activated later on', async () => {
      const renderMock = jest.fn()
      render(
        <UnnecessaryRerenderTest
          onRender={renderMock}
          pausedOnStartup={false}
        />
      )
      const pauseButton = screen.getByRole('button', { name: 'Toggle Pause' })
      await userEvent.click(pauseButton)
      const promise = new Promise<void>((r) => setTimeout(r, 500))
      await act(() => promise)
      /**
       * Since the update to React 18, this number is sometimes 1, sometimes 2. Since the intent of this test
       * is only to prevent infinite render loops (which would be a significantly higher number), we just check
       * whether we're in the right ballpark.
       */
      const maxNumberOfCalls = 3
      expect(
        renderMock.mock.calls.filter((args) => args[0] === true).length // render call where paused was true
      ).toBeLessThan(maxNumberOfCalls)
    })
  })
})
