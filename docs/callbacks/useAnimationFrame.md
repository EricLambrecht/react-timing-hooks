---
title: useAnimationFrame
parent: Callbacks / Functions
nav_order: 2
---

# useAnimationFrame

Use this hook to create a callback that executes the provided function via [`window.requestAnimationFrame()`][raf-mdn].

{: .warning }
> Note
>
> _This hook is quite low level._ You might want to use `useAnimationFrameLoop()` or `useIdleCallback()` instead.

#### Alternatives

- [useAnimationFrameLoop()](/react-timing-hooks/loops-and-intervals/useAnimationFrameLoop.html)
- [useIdleCallback()](/react-timing-hooks/callbacks/useIdleCallback.html)
- [useTimeout()](/react-timing-hooks/callbacks/useTimeout.html)

## Example

```javascript
import { useAnimationFrame } from 'react-timing-hooks'

const myFunc = () => console.log("hi")
const runMyFuncOnAnimationFrame = useAnimationFrame(myFunc)

return <button onClick={runMyFuncOnAnimationFrame}>Click Me</button>
```

## API

`useAnimationFrame()`
{: .fs-5 .fw-300 }

### Params

| Name             | Description                                                                                                                                                                        |
|:-----------------|:-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| callback         | A function that will be called at the next available animation frame. See [requestAnimationFrame()](https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame) |

### Return value

A function. If you call this function, your `callback` will be executed at the next available animation frame.

## Notes

Queued animation frame callbacks will be automatically canceled on unmount.

[raf-mdn]: https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame
