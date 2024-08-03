---
title: useIdleCallbackEffect
parent: Effects
nav_order: 2
---

# useIdleCallbackEffect

This works like a regular `useEffect()` hook, except that it adds an enhanced version of [`window.requestIdleCallback()`][mdn]
to the callback args. 

There might be cases where the simpler `useIdleCallback()` hook might be more suitable.

{: .highlight }
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

`useIdleCallbackEffect(effectCallback, deps)`
{: .fs-5 .fw-300 }

### Params

| Name             | Description                                                                                           |
|:-----------------|:------------------------------------------------------------------------------------------------------|
| effectCallback   | Works like a `useEffect` callback, but receives one argument, instead of none. See below for details. |
| deps             | Your regular `useEffect` dependency array.                                                            |

##### effectCallback(requestIdleCallback)

The effect callback receives one argument:

1. `requestIdleCallback(cb, opts)` – the signature of this function is identical to [`window.requestIdleCallback()`][mdn]
The only difference is, that created idle callback requests (created with this function) will be automatically cancelled on unmount if still pending while unmounting.

### Return value

This hook has no return value.

## Notes

Any registered idle callbacks will be canceled on unmount.

{: .warning }
This hook **will print a console warning** if the browser doesn't support `requestIdleCallback`.

[mdn]: https://developer.mozilla.org/en-US/docs/Web/API/Window/requestIdleCallback
