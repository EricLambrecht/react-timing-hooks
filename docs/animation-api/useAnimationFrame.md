---
title: useAnimationFrame
parent: Animation
nav_order: 2
---

# useAnimationFrame

Use this hook to create a function that executes another function at the next available animation frame.

_This hook is quite low level._ 
You might want to use `useAnimationFrameLoop` or `useIdleCallback` instead.

## Example

```javascript
import { useAnimationFrame } from 'react-timing-hooks'

const myFunc = () => console.log("hi")
const runMyFuncOnAnimationFrame = useAnimationFrame(myFunc)

return <button onClick={runMyFuncOnAnimationFrame}>Click Me</button>
```

## API

### Params

`useAnimationFrame()`

| Name             | Description                                                          |
|:-----------------|:---------------------------------------------------------------------|
| callback         | A function that will be called at the next available animation frame. See [requestAnimationFrame()](https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame) |

### Return value

A function. If you call this function, your `callback` will be executed at the next available animation frame.

## Notes

Queued animation frame callbacks will be automatically canceled on unmount.
