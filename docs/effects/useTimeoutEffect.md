---
title: useTimeoutEffect
parent: Effects
nav_order: 1
---

# useTimeoutEffect

This works like a regular `useEffect` hook, except that it adds a `setTimeout` like function
to the callback args. This way, one our multiple timeouts can be triggered every time state or props of your component change.

If you want to just fire a simple function call after a specific delay, you might want to use `useTimeout()` instead.

{: .highlight }
Any timeout will be automatically cleared on unmount.

## Example

```javascript
import { useTimeoutEffect } from 'react-timing-hooks'

// Delay the transition of a color by one second everytime it changes
useTimeoutEffect((timeout, clear) => {
  if (color) {
    timeout(() => transitionTo(color), 1000)
  }
}, [color])
```

## API

`useTimeoutEffect(effectCallback, timeout)`
{: .fs-5 .fw-300 }

### Params

| name           | description                                                          |
|:---------------|:---------------------------------------------------------------------|
| effectCallback | Like a regular `useEffect` callback, but receives it receives two arguments, see below |
| timeout        | This is your regular `useEffect` dependency array                                      |

##### effectCallback(timeout, clear)

The effect callback receives two arguments: 

1. `timeout(cb, timeout)`: This has the same signature as a native `setTimeout`. The only difference is, that timeouts created with this function will automatically be cleared when you unmount the component.
2. `clear`: A function to manually clear all spawned timeouts if that is desired. (Timeouts will be cleared automatically on unmount).


## Notes

This hook will automatically clear any pending timeout(s) on unmount. You don't have to clean up the timeouts manually. 
However, you can clear them manually via the returned id (or all at once using the second param of the effect callback).
