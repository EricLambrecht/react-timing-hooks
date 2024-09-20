---
title: useInterval
description: A React hook to create a reactive interval . A wrapper for setInterval.
parent: Loops & Intervals
nav_order: 1
---

# useInterval

A react wrapper for [setInterval](https://developer.mozilla.org/en-US/docs/Web/API/setInterval) – no leaks on unmount!
{: .fs-6 .fw-300 }

This hook allows you to do certain actions at a regular interval, a.k.a. *loops*. 
It is a React-wrapper for the native Javascript function [`setInterval`](https://developer.mozilla.org/en-US/docs/Web/API/setInterval).

In addition to the standard Javascript API, the returned callbacks allow you to **pause, resume, stop and start** the interval, too.

{: .note }
By default, the interval is _stopped_ on mount and has to be started manually. If you want the interval to start automatically on mount, use `options.startOnMount`.

{: .highlight-title }
> Good to know
>
> By default, `setInterval` waits one entire interval step to fire its callback for the first time. However, `useInterval()` 
> supports an `isLeading` option to invoke the provided callback immediately upon start. 

#### Alternatives

- If you want to loop very fast – maybe because you want to animate something – 
you might want to use [useAnimationFrameLoop()](/react-timing-hooks/loops-and-intervals/useAnimationFrameLoop.html) instead which yields better performance in these cases.

- If you only want to increase or decrease a numeric value in a regular interval,
take a look at [useCounter()](/react-timing-hooks/loops-and-intervals/useCounter.html).


## Examples

### Simple interval that starts immediately on mount

```javascript
import { useInterval } from 'react-timing-hooks'

// Increase count every 200 milliseconds
const [count, setCount] = useState(0)
const increaseCount = () => setCount(count + 1)
useInterval(increaseCount, 200, { startOnMount: true })
```

### Pausing and resuming an interval

```javascript
import { useInterval } from 'react-timing-hooks'

const [count, setCount] = useState(0)
const increaseCount = () => setCount(count + 1)
const {
  start,
  pause,
  resume,
  isPaused
} = useInterval(increaseCount, 200)

return <div>
  <button onClick={start}>Start!</button>
  <button onClick={isPaused ? resume : pause}>
    {isPaused ? "Resume" : "Pause"}
  </button>
</div>
```

## API

`useInterval(callback, delay, options = {})`
{: .fs-5 .fw-300 }

### Params

| Name                 | Default       | Description                                                                                                                                                                                                                     |
|:---------------------|---------------|:--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| callback             | _is required_ | A function that will be invoked as soon as the timeout expires                                                                                                                                                                  |
| delay                | _is required_ | A number (milliseconds) or null. If numeric, it is the delay between each execution of `callback`. See [setInterval()](https://developer.mozilla.org/en-US/docs/Web/API/setInterval). If set to `null`, the interval will stop. |
| options.startOnMount | `false`       | If true, the counter will immediately start on mount. If false, it has to be started manually via `start()`.                                                                                                                    |
| options.isLeading    | `false`       | If true, the provided callback will be invoked immediately on start. If false (default), the callback's first invocation will be after the first interval step, same behaviour as Javascript's `setInterval`.                   |

### Return value

An object of interval controls:

| Name      | Description                                                                                                                         |
|:----------|:------------------------------------------------------------------------------------------------------------------------------------|
| isPaused  | A boolean that indicates whether the interval is currently paused.                                                                  |
| isStopped | A boolean that indicates whether the interval is currently stopped. Meaning it cannot be resumed, but only restarted via `start()`. |
| pause     | A function that will temporarily pause the interval without destroying it, i.e. it will continue to run without executing the callback. |
| resume    | A function that resumes a paused interval.                                                                                          |
| stop      | A function that stops and destroys(!) the interval.                                                                                 |
| start     | A function that restarts a stopped interval.                                                                                        |


## Notes

Pending intervals will be cleared upon unmount.
