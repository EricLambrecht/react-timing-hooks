import { renderHook, act } from '@testing-library/react'
import useControls from './useControls'

describe('useControls', () => {
  it('offers a pause/resume functionality', () => {
    const { result } = renderHook(() => useControls())
    expect(result.current.isPaused).toBe(false)
    expect(result.current.isStopped).toBe(false)
    act(() => result.current.pause())
    expect(result.current.isPaused).toBe(true)
    expect(result.current.isStopped).toBe(false)
    act(() => result.current.resume())
    expect(result.current.isPaused).toBe(false)
    expect(result.current.isStopped).toBe(false)
  })

  it('offers a start/stop functionality', () => {
    const { result } = renderHook(() => useControls())
    expect(result.current.isPaused).toBe(false)
    expect(result.current.isStopped).toBe(false)
    act(() => result.current.stop())
    expect(result.current.isPaused).toBe(false)
    expect(result.current.isStopped).toBe(true)
    act(() => result.current.start())
    expect(result.current.isPaused).toBe(false)
    expect(result.current.isStopped).toBe(false)
  })

  it('can be paused initially', () => {
    const { result } = renderHook(() => useControls(true))
    expect(result.current.isPaused).toBe(true)
    expect(result.current.isStopped).toBe(false)
  })

  it('can be stopped initially', () => {
    const { result } = renderHook(() => useControls(undefined, true))
    expect(result.current.isPaused).toBe(false)
    expect(result.current.isStopped).toBe(true)
  })

  it('can be stopped and paused initially', () => {
    const { result } = renderHook(() => useControls(true, true))
    expect(result.current.isPaused).toBe(true)
    expect(result.current.isStopped).toBe(true)
  })
})
