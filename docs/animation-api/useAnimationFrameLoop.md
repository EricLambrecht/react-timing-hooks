---
title: useAnimationFrameLoop
parent: Animation
nav_order: 1
---

# useAnimationFrameLoop

Use this hook if you want to execute something (like css updates, or Web GL rendering) in an **animation frame
loop** at **roughly 60FPS** in your React component.

You can **pause** or **stop** the loop via the returned control callbacks.
Pausing will make the hook still running on an animation frame loop, but without executing your callback. 
Stopping will completely halt it and cancel any open animation frame requests, just as if you would unmount it.
If **performance** is important to you, you should stop the loop instead of pausing it whenever possible.

**Note**: By default, the loop is _stopped_ on mount and has to be started manually. If you want the loop to start immediately on mount, use `options.startOnMount`.

The browser will call your function approximately 60 times a second (60 FPS) if the performance of your app allows it.
See [window.requestAnimationFrame()](https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame) to learn 
more about the inner workings of "animation frames".

## Example

```typescript jsx
import { useRef } from 'react'
import { useAnimationFrameLoop } from 'react-timing-hooks'

const Renderer = () => {
  const delta = useRef(0)
  const canvasRef = useRef(null)
  const canvas = canvasRef.current
  const context = canvas.getContext('2d')

  const updateCanvas = (d) => {
    context.fillStyle = '#000000'
    context.fillRect(d, d, context.canvas.width, context.canvas.height)
  }

  const { start, stop, isStopped } = useAnimationFrameLoop(() => {
    delta.current += 1
    updateCanvas(delta.current)
  })
  
  return <>
    <canvas ref={canvasRef} {...props}/>
    <button onClick={isStopped ? start : stop}>
      {isStopped ? "Start rendering" : "Stop rendering"}
    </button>
  </>
}
```

## API

`useAnimationFrameLoop(cb, options = {})`
{: .fs-5 .fw-300 }

### Params

| Name                 | Default                      | Description                                                                                                |
|:---------------------|:-----------------------------|:-----------------------------------------------------------------------------------------------------------|
| callback             | _This argument is required_  | Function that will be called on every (available) animation frame                                          |
| options.startOnMount | `false`                      | If true, the counter will immediately start on mount. If false, it has to be started manually via start(). |

### Return value

This hook has no return value.
