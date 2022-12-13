---
title: useCountdown
parent: Intervals
nav_order: 2
---

# useCountdown

Use this hook if you want to create a countdown, i.e. a reactive number that is decremented every second.

It's the opposite of [useTimer()](/react-timing-hooks/intervals-api/useTimer.html). For a more versatile hook, you can
also use [useCounter()](/react-timing-hooks/intervals-api/useCounter.html)

## Example

```javascript
import { useCountdown } from 'react-timing-hooks'

// this will count downwards every second
const countdownValue = useCountdown(0)
return <span>{countdownValue}</span>
```

### A timer that increases by 3 every

## API

### Params

`useCountdown(start = 0, stop)`

| Name  | Default     | Description                        |
|:------|:------------|:-----------------------------------|
| start | `0`         | The initial value of the countdown |


### Return value

The current value. This will change every second.

## Note

This is essentially a counter (`useCounter`) with `settings.stepSize` set to `1` and `interval` set to `1000`.
Use `useCounter` if you want a more customized timer.
