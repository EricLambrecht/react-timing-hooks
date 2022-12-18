---
title: useDebounce
parent: Timeouts
---

# useDebounce

Debounces a callback.
{: .fs-6 .fw-300 }

Use this hook if you want a function that "piles up" consecutive calls to invoke the callback only once after a
specified timeout after the last call happened. This is called **debouncing**.

If you want a callback that [doesn't debounce but throttles][thr-vs-deb], take a look at `useThrottle()`.
 
If you want a non-debouncing and non-throttling version, take a look at `useTimeout()`.

Pending timeouts will also be cleared in case the component unmounts.

## Example

```javascript
import { useDebounce } from 'react-timing-hooks'

// Debounce key up event, message will be logged if last key up event has been more than 2 seconds ago.
const onKeyUp = useDebounce(() => console.log('key up'), 2000)

return <textarea onKeyUp={onKeyUp}>Lorem ipsum</textarea>
```

## API

### Params

`useDebounce(callback, waitMs, options)`

| Name             | Default     | Description                                                             |
|:-----------------|-------------|:------------------------------------------------------------------------|
| callback         | _*required_ | A function that will be invoked as soon as the timeout expires          |
| waitMs           | _*required_ | The minimum waiting time until an invocation can happen.                |
| options          | `{}`        | Debouncing options                                                      |
| options.leading  | `false`     | If `true` the callback will be invoked immediately / before the timeout |
| options.trailing | `true`      | If `true` the callback will be invoked after the timeout                |


### Return value

A function will be returned, that - once executed - will run the `callback`-function after `{timeout}` milliseconds.
The function will also return the timeout id in case you want to clear it manually via `clearTimeout(id)`.

## Notes

This hook will automatically clear any pending timeout on unmount. Timeout's can be cleared manually as well (see "Return value").

[thr-vs-deb]: https://css-tricks.com/the-difference-between-throttling-and-debouncing/
