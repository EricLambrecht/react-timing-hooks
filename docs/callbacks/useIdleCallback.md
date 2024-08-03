---
title: useIdleCallback
parent: Idle Callbacks
nav_order: 1
---

# useIdleCallback

Use this hook if you want to delay the execution of a function to a time **when the browser is idle**.

A good use-case for this might be _user tracking_, for instance.

{: .important }
See [requestIdleCallback()](https://developer.mozilla.org/en-US/docs/Web/API/Window/requestIdleCallback) to learn
more about the concept of "idle callbacks".

## Example

```javascript
import { useIdleCallback } from 'react-timing-hooks'

// Track button click when idle
const trackClickWhenIdle = useIdleCallback(trackClick)

return <button onClick={trackClickWhenIdle}>Track me!</button>
```

## API

`useIdleCallback(callback, options)`
{: .fs-5 .fw-300 }

### Params

| Name             | Default value       | Description                                             |
|:-----------------|:--------------------|:--------------------------------------------------------|
| callback         | _This is required._ | Callback that will be invoked when the browser is idle. |
| options          | `undefined`         | options for `requestIdleCallback`.                      |

### Return value

A function that executes your callback as an idle callback.

## Notes

Any registered idle callbacks will be canceled on unmount.

This hook **will print a console warning** if the browser doesn't support `requestIdleCallback`.
