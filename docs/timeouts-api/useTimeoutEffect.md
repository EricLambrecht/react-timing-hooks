---
title: useTimeoutEffect
parent: Timeouts
---

# useTimeoutEffect

This works like a regular `useEffect` hook, except that it adds a `setTimeout` like function
to the callback args. This way, one our multiple timeouts can be triggered every time state or props of your component change.

If you want to just fire a simple function call after a specific delay, you might want to use `useTimeout` instead.

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

## Params

`useTimeoutEffect(effectCallback, timeout)`

| name           | description                                                          |
|:---------------|:---------------------------------------------------------------------|
| effectCallback | Like a regular `useEffect` callback, but receives it receives two arguments, see below |
| timeout        | This is your regular `useEffect` dependency array

### effectCallback(timeout, clear)

The effect callback receives two arguments: 

1. `timeout(cb, timeout)`: This has the same signature as a native `setTimeout`.
2. `clear`: A function to manually clear the current timeout if that is desired. (Timeouts will be cleared automatically on unmount).


## Notes

This hook will automatically clear any pending timeout(s) on unmount. You don't have to clean up the timeouts manually. But you can (using the second param of the effect callback).
