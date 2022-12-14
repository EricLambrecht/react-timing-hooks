---
title: useTimer
parent: Intervals
nav_order: 2
---

# useTimer

Use this hook if you want to create a timer, i.e. a reactive number that is incremented every second.

**Note**: By default, the timer is _stopped_ on mount and has to be started manually. If you want the timer to start immediately on mount, use `options.startOnMount`.

For a more versatile hook, look at [useCounter()](/react-timing-hooks/intervals-api/useCounter.html).
For a "reverse timer", see [useCountdown()](/react-timing-hooks/intervals-api/useCountdown.html).

## Example

```javascript
import { useTimer } from 'react-timing-hooks'

// this will count upwards every second
const [timerValue] = useTimer(0, { startOnMount: true })
return <span>{timerValue}</span>
```

## API

### Params

`useTimer(start = 0)`

| Name                 | Default    | Description                                                                                                  |
|:---------------------|:-----------|:-------------------------------------------------------------------------------------------------------------|
| start                | `0`        | The initial value of the timer                                                                               |
| options.startOnMount | `false`    | If true, the counter will immediately start on mount. If false, it has to be started manually via `start()`. |


### Return value

An array of format `[timerValue, intervalControls]`, the first value is the current countdown value. This will be incremented by 1, every second.

The second value is an object of interval controls (start, stop, pause, etc.), see [useInterval()](/react-timing-hooks/intervals-api/useInterval.html#return-value).


