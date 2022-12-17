---
title: useDebounce
parent: Timeouts
---

# useDebounce

A react wrapper for [setTimeout](https://developer.mozilla.org/en-US/docs/Web/API/setTimeout) – no leaks on unmount!
{: .fs-6 .fw-300 }

Use this hook if you want a function that "piles up" consecutive calls to invoke the callback only once after a
specified timeout after the last call happened. This is called **debouncing**.

If you want a callback that executes
 
If you want a non-debouncing version, take a look at `useTimeout()`.

Pending timeouts will also be cleared in case the component unmounts.

## Example

```javascript
import { useDebounce } from 'react-timing-hooks'

// Debounce button click, message will be logged if button is not clicked more than once during 2 seconds
const onClick = useDebounce(() => console.log('clicked'), 2000)

return <button onClick={onClick}>Spam me!</button>
```

## API

### Params

`useDebounce(callback, timeout)`

| name            | description                                                                                     |
|:----------------|:------------------------------------------------------------------------------------------------|
| callback        | a function that will be invoked as soon as the timeout expires                                  |
| timeout         | the timeout in milliseconds                                                                     |
| options         | Debouncing options                                                                              |
| options.leading | Defaults to `false`. If `true` the callback will be invoked immediately instead after the delay |


### Return value

A function will be returned, that - once executed - will run the `callback`-function after `{timeout}` milliseconds.
The function will also return the timeout id in case you want to clear it manually via `clearTimeout(id)`.

## Notes

This hook will automatically clear any pending timeout on unmount. Timeout's can be cleared manually as well (see "Return value").
