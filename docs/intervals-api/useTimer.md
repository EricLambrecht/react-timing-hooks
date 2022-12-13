---
title: useTimer
parent: Intervals
nav_order: 2
---

# useTimer

Use this hook if you want to create a timer, i.e. a reactive number that is incremented every second.

For a more versatile hook, look at [useCounter()](/react-timing-hooks/intervals-api/useCounter.html).
For a "reverse timer", see [useCountdown()](/react-timing-hooks/intervals-api/useCountdown.html).

## Example

```javascript
import { useTimer } from 'react-timing-hooks'

// this will count upwards every second
const timerValue = useTimer(0)
return <span>{timerValue}</span>
```

## API

### Params

`useTimer(start = 0)`

| Name     | Default | Description                                    |
|:---------|:--------|:-----------------------------------------------|
| start    | `0`     | The initial value of the timer                 |


### Return value

The current value. This will change every second.

## Note

This is essentially a counter ([useCounter()](/react-timing-hooks/intervals-api/useCounter.html)) with `settings.stepSize` set to `1` and `interval` set to `1000`.
Use [useCounter()](/react-timing-hooks/intervals-api/useCounter.html) if you want a more customized timer.
