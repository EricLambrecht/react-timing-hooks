import { render, act, fireEvent, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import React, { useState } from 'react'
import { useAnimationFrameLoop } from '../.tmp/index'
// @ts-ignore
import { animationFrame } from '@shopify/jest-dom-mocks'

jest.useRealTimers()

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

  describe('Github issue #25: Infinite rerender bug', () => {
    const UnnecessaryRerenderTest: React.FC<{
      onRender: jest.Mock
      pausedOnStartup: boolean
    }> = ({ onRender, pausedOnStartup }) => {
      const [count, setCount] = useState(0)
      const [paused, setPaused] = useState(pausedOnStartup)

      useAnimationFrameLoop(() => {
        setCount(count + 1)
      }, paused)

      onRender(paused)

      return (
        <>
          <p data-testid="output">{count}</p>
          <button data-testid="button" onClick={() => setPaused(!paused)}>
            Toggle Pause
          </button>
        </>
      )
    }

    it('does not cause an infinite render loop when paused on startup', async () => {
      const renderMock = jest.fn()
      render(<UnnecessaryRerenderTest onRender={renderMock} pausedOnStartup />)
      const promise = new Promise<void>((r) => setTimeout(r, 250))
      await act(() => promise)
      expect(renderMock).toBeCalledTimes(1)
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
      const promise = new Promise<void>((r) => setTimeout(r, 250))
      await act(() => promise)
      expect(
        renderMock.mock.calls.filter((args) => args[0] === true) // render call where paused was true
      ).toHaveLength(1)
    })
  })
})
