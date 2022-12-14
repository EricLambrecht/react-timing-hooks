---
title: useCounter
parent: Intervals
nav_order: 2
---

# useCounter

Use this hook if you want to have a customizable counter that changes a value by `settings.stepSize` every `settings.interval` milliseconds.
A start value (`settings.start`) can also be defined.

**Note**: By default, the counter is _stopped_ on mount and has to be started manually. If you want the counter to start immediately on mount, use `options.startOnMount`.

If you want a counter that counts up by 1 every second, you can use the [useTimer()](/react-timing-hooks/intervals-api/useTimer.html) hook.

If you want a counter that counts down every second, use [useCountdown()](/react-timing-hooks/intervals-api/useCountdown.html).

## Example

### A regular timer that counts up every second (default)

```javascript
import { useCounter } from 'react-timing-hooks'

// this will count upwards every second
const [counter] = useCounter({ 
  start: 0, 
  interval: 1000, 
  stepSize: 1,
  startOnMount: true
})

return <span>{counter}</span>
```

## API

### Params

`useCounter(settings)`

| Name                  | Default | Description                                                                                                  |
|:----------------------|:--------|:-------------------------------------------------------------------------------------------------------------|
| settings.start        | `0`     | The initial value of the counter                                                                             |
| settings.interval     | `1000`  | The duration between each counter step                                                                       |
| settings.stepSize     | `1`     | The amount that is added after each counter step                                                             |
| settings.startOnMount | `false` | If true, the counter will immediately start on mount. If false, it has to be started manually via `start()`. |



### Return value

An Array of `[counterValue, intervalControls]`.

The first array item is the current counter value (starting at `settings.start`). This will change every `settings.interval` ms by `settings.stepSize`.

The second value is an object of interval controls, see [useInterval()](/react-timing-hooks/intervals-api/useInterval.html#return-value).
