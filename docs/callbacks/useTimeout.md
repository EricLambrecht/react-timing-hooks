---
title: useTimeout
description: A React hook tp wrap setTimeout()
parent: Callbacks / Functions
nav_order: 1
---

# useTimeout

A react wrapper for [setTimeout](https://developer.mozilla.org/en-US/docs/Web/API/setTimeout) – no leaks on unmount!
{: .fs-6 .fw-300 }

Use this hook if you want a function that executes the provided callback after the specified amount of time.

This **will not debounce or throttle** the callbacks, i.e. consecutive calls of this function will all spawn
new timeouts even if some are still pending. If you want a debouncing version, take a look at `useDebounce()`.
If you want a throttling version, see `useThrottle()`.

{: .note }
Pending timeouts will only(!) be cleared in case the component unmounts. If you want to clear them manually, you can do so via the returned timeout id.

#### Alternatives

- If you want to execute a timeout every time a certain value changes, `useTimeoutEffect()` might be better suited.
- For throttling [useThrottle()](/react-timing-hooks/callbacks/useThrottle.html).
- For debouncing [useThrottle()](/react-timing-hooks/callbacks/useThrottle.html).

## Example

```javascript
import { useTimeout } from 'react-timing-hooks'

// Hide something after 2 seconds
const hideDelayed = useTimeout(() => setHide(true), 2000)

return <button onClick={hideDelayed}>Hide!</button>
```

## API

`useTimeout(callback, timeout)`
{: .fs-5 .fw-300 }

### Params

| Name     | Description                                                    |
|:---------|:---------------------------------------------------------------|
| callback | a function that will be invoked as soon as the timeout expires |
| timeout  | the timeout in milliseconds                                    |

### Return value

A function will be returned, that - once executed - will run the `callback`-function after `{timeout}` milliseconds.
The function will also return the timeout id in case you want to clear it manually via `clearTimeout(id)`.

## Notes

This hook will automatically clear any pending timeout on unmount. Timeout's can be cleared manually as well (see "Return value").
