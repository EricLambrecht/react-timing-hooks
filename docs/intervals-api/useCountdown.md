---
title: useCountdown
parent: Intervals
nav_order: 2
---

# useCountdown

10…, 9…, 8…, 7…
{: .fs-6 .fw-300 }

Use this hook if you want to create a countdown, i.e. a reactive number that is decremented every second.

**Note**: By default, the countdown is _stopped_ on mount and has to be started manually. If you want the countdown to start immediately on mount, use `options.startOnMount`.

This hook is basically the opposite of [useTimer()](/react-timing-hooks/intervals-api/useTimer.html) which counts _up_ every second. For a more versatile hook, you can
also use [useCounter()](/react-timing-hooks/intervals-api/useCounter.html).

## Example

```javascript
import { useCountdown } from 'react-timing-hooks'

// this will count from 10 to 0 (updated every second) and stop there
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
