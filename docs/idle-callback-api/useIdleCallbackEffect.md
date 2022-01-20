---
title: useIdleCallback
parent: Idle Callbacks
nav_order: 2
---

# useIdleCallbackEffect

This works like a regular `useEffect` hook, except that it adds a `requestIdleCallback` like function
to the callback args. 

There might be cases where the simpler `useIdleCallback` hook might be more suitable.

Any registered idle callbacks will be canceled on unmount.

## Example

```javascript
import { useIdleCallbackEffect } from 'react-timing-hooks'

// Track page view (when browser is idle) whenever "page" changes 
useIdleCallbackEffect(onIdle => {
  if (page) {
    onIdle(() => trackPageView(page))
  }
}, [page])
```

## API

### Params

`useIdleCallbackEffect(effectCallback, deps)`

| Name             | Description                                                          |
|:-----------------|:---------------------------------------------------------------------|
| effectCallback   | Works like a `useEffect` callback, but receives one argument, instead of none. See below for details. |
| deps             | Your regular `useEffect` dependency array. |

#### effectCallback(requestIdleCallback)

The effect callback receives one argument:

1. `requestIdleCallback(cb, opts)` – the signature of this function is identical to [requestIdleCallback()](https://developer.mozilla.org/en-US/docs/Web/API/Window/requestIdleCallback).
The only difference is, that created idle callback requests (created with this function) will be automatically cancelled on unmount if still pending while unmounting.

### Return value

This hook has no return value.

## Notes

Any registered idle callbacks will be canceled on unmount.

This hook **will print a console warning** if the browser doesn't support `requestIdleCallback`.
