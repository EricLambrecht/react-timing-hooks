---
title: useCountdown
parent: Intervals
nav_order: 3
---

# useCountdown

10…, 9…, 8…, 7…
{: .fs-6 .fw-300 }

Use this hook if you want to create a **countdown**, i.e. a reactive number that is **decremented every second**.
The hook will stop its interval automatically when it reaches the end.

The event callback `options.onEnd()` will be called as soon as the end value is reached.

**Note**: By default, the countdown is _stopped_ on mount and has to be started manually. 
If you want the countdown to start immediately on mount, use `options.startOnMount`.

This hook is similar to [useTimer()](/react-timing-hooks/intervals-api/useTimer.html) which counts _up_ every second and does not have an end value.
If you need a countdown that count's upwards, you can use `options.stepSize` and change it to `1` or higher.

For a more freedom/versatility, you can use [useCounter()](/react-timing-hooks/intervals-api/useCounter.html).

## Example

```javascript
import { useCountdown } from 'react-timing-hooks'

// this will count from 10 to 0 (updated every second) and stop there
const [counter] = useCountdown(10, 0, { 
  onEnd: () => console.log('BOOM!')
})

return <span>{counter}</span>
```

## API

### Params

`useCountdown(start = 0, options = {})`

| Name                 | Default       | Description                                                                                                  |
|:---------------------|:--------------|:-------------------------------------------------------------------------------------------------------------|
| start                | _is required_ | The initial value of the countdown                                                                           |
| options.startOnMount | `false`       | If true, the counter will immediately start on mount. If false, it has to be started manually via `start()`. |



### Return value

An array of format `[countdownValue, intervalControls]`, the first value is the current countdown value.

The second value is an object of interval controls (start, stop, pause, etc.), see [useInterval()](/react-timing-hooks/intervals-api/useInterval.html#return-value).

## Note

This is essentially a counter (`useCounter`) with `settings.stepSize` set to `1` and `interval` set to `1000`.
Use `useCounter` if you want a more customized timer.
