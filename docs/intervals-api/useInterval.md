---
title: useInterval
parent: Intervals
nav_order: 1
---

# useInterval

A react wrapper for [setInterval](https://developer.mozilla.org/en-US/docs/Web/API/setInterval) – no leaks on unmount!
{: .fs-6 .fw-300 }

This hook allows you to do certain actions at a regular interval, i.e. **loops**. 
It is a react-wrapper for the native javascript function `setInterval`.

In addition to the standard Javascript API, the returned callbacks allow you to **pause, resume, stop and start** the interval, too.

If you want to loop very fast – maybe because you want to animate something – 
you might want to use [useAnimationFrameLoop()](/react-timing-hooks/animation-api/useAnimationFrameLoop.html) instead which yields better performance in these cases.

If you only want to increase or decrease a numeric value in a regular interval,
take a look at [useCounter()](/react-timing-hooks/intervals-api/useCounter.html).


## Example

### Regular Interval

```javascript
import { useInterval } from 'react-timing-hooks'

// Increase count every 200 milliseconds
const [count, setCount] = useState(0)
useInterval(() => setCount(count + 1), 200)
```

### Controllable Interval

```javascript
import { useInterval } from 'react-timing-hooks'

const [count, setCount] = useState(0)
const { pause, resume, isPaused } = useInterval(() => setCount(count + 1), 200)

return <div>
  <button onClick={isPaused ? resume : pause}>
    {isPaused ? "Pause" : "Resume"}
  </button>
</div>
```

## API

### Params

> useInterval(callback, delay, controls = {})

| Name     | Default       | Description                                                                                                                         |
|:---------|---------------|:------------------------------------------------------------------------------------------------------------------------------------|
| callback | _is required_ | A function that will be invoked as soon as the timeout expires                                                                      |
| delay    | _is required_ | The delay between each execution of `callback`. See [setInterval()](https://developer.mozilla.org/en-US/docs/Web/API/setInterval). |

### Return value

An object of interval controls:

| Name       | Description                                                                                                                         |
|:-----------|:------------------------------------------------------------------------------------------------------------------------------------|
| isPaused   | A boolean that indicates whether the interval is currently paused                                                                   |
| isStoppped | A boolean that indicates whether the interval is currently stopped. Meaning it cannot be resumed, but only restarted via `start()`. |
| pause      | A function that will temporarily pause the interval without destroying it                                                           |
| resume     | A function that resumes a paused interval                                                                                           |
| stop       | A function that stops and destroys(!) the interval.                                                                                 |
| start      | A function that restarts a stopped interval                                                                                         |


## Notes

Pending intervals will be cleared upon unmount.
