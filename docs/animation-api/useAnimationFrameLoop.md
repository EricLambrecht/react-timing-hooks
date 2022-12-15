---
title: useAnimationFrameLoop
parent: Animation
nav_order: 1
---

# useAnimationFrameLoop

Use this hook if you want to execute something (like css updates, or Web GL rendering) in an animation frame 
loop in your React component.

The browser will call your function approximately 60 times a second (60 FPS) if the performance of your app allows it.
See [requestAnimationFrame()](https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame) to learn 
more about the inner workings of "animation frames".

## Example

```javascript
import { useAnimationFrameLoop } from 'react-timing-hooks'

// Update canvas on every frame
const [stop, setStop] = useState(false)
const updateCanvas = () => { 
    // ... 
}
useAnimationFrameLoop(updateCanvas, stop)
```

### Another example

In a vanilla javascript WebGL application you might have code like this:

```javascript
/* Vanilla JS */
const draw = () => {
    // ...
    gl.drawArrays(...)

    window.requestAnimationFrame(draw);
}
```

In a React component this would need additional logic to cancel the animation frame request if the parent component unmounts.

With `useAnimationFrameLoop` you don't have to worry about that and can implement it like this instead:

```javascript
/* React */
const draw = useCallback(() => {
  // ...
  gl.drawArrays(...)
})
useAnimationFrameLoop(draw)
```

## API

### Params

`useAnimationFrameLoop(cb, pause)`

| Name             | Default                     | Description                     |
|:-----------------|:----------------------------|:--------------------------------|
| callback         | _This argument is required_ | Function that will be called on every (available) animation frame |
| pause             | `false`                    | A boolean that pauses the loop  |

### Return value

This hook has no return value.
