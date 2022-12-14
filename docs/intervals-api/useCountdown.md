---
title: useCountdown
parent: Intervals
nav_order: 2
---

# useCountdown

10…, 9…, 8…, 7…
{: .fs-6 .fw-300 }

Use this hook if you want to create a countdown, i.e. a reactive number that is decremented every second.

This hook is basically the opposite of [useTimer()](/react-timing-hooks/intervals-api/useTimer.html). For a more versatile hook, you can
also use [useCounter()](/react-timing-hooks/intervals-api/useCounter.html).

## Example

```javascript
import { useCountdown } from 'react-timing-hooks'

// this will count from 10 to 0 and stop there
const [counter, { stop }] = useCountdown(10)

useEffect(() => {
  if (counter === 0) {
    stop()
  }
}, [counter])

return <span>{counter}</span>
```

## API

### Params

`useCountdown(start = 0, stop)`

| Name  | Default       | Description                        |
|:------|:--------------|:-----------------------------------|
| start | _is required_ | The initial value of the countdown |


### Return value

An array of format `[countdownValue, intervalControls]`, the first value is the current countdown value.

The second value is an object of interval controls, see [useInterval()](/react-timing-hooks/intervals-api/useInterval.html#return-value).

## Note

This is essentially a counter (`useCounter`) with `settings.stepSize` set to `1` and `interval` set to `1000`.
Use `useCounter` if you want a more customized timer.
