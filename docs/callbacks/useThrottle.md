---
title: useThrottle
parent: Callbacks / Functions
nav_order: 2
---

# useThrottle

Throttles a callback.
{: .fs-6 .fw-300 }

Can be used for **rate-limiting** – the callback will only be invoked every X milliseconds (X being the set timeout),
even if it was called more frequently.

{: .note-title }
> Throttle vs. Debounce
>
> Similar, [but different(!)][thr-vs-deb], is the `useDebounce()` hook, which blocks the invocation entirely until the function was
> stopped being called for X milliseconds.

By default, the throttled function will always be called immediately (`options.leading` is true by default) and then
(`options.trailing` is true by default) also after every X milliseconds for consecutive calls.

## Example

```javascript
import { useThrottle } from 'react-timing-hooks'

// Throttle button click: message can only be logged once every 2 seconds, regardless of how often the button is clicked.
const onClick = useThrottle(() => console.log('clicked'), 2000)

return <button onClick={onClick}>Spam me!</button>
```

## API

`useThrottle(callback, waitMs, options)`
{: .fs-5 .fw-300 }

### Params

| Name             | Default     | Description                                                 |
|:-----------------|-------------|:------------------------------------------------------------|
| callback         | _*required_ | A function that will be invoked as the throttling allows    |
| waitMs           | _*required_ | Minimum waiting time between consecutive calls              |
| options          | `{}`        | Throttling options                                          |
| options.leading  | `true`      | If true, invoke the callback immediately/before the timeout |
| options.trailing | `true`      | If true, queue invocations for after the timeout            |


### Return value

A function will be returned, that can run the `callback`-function only every `{timeout}` milliseconds.
The function will also return the timeout id in case you want to clear it manually via `clearTimeout(id)`.

## Notes

This hook will automatically clear any pending timeout on unmount. Timeout's can be cleared manually as well (see "Return value").

[thr-vs-deb]: https://css-tricks.com/the-difference-between-throttling-and-debouncing/
