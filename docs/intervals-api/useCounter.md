---
title: useCounter
parent: Intervals
nav_order: 2
---

# useCounter

Use this hook if you want to have a customizable counter that changes a value by `settings.stepSize` every `settings.interval` milliseconds.
A start value (`settings.start`) can also be defined.

If you want a counter that counts up by 1 every second, you can use the [useTimer()](/react-timing-hooks/intervals-api/useTimer.html) hook.

## Example

### A regular timer that counts up every second (default)

```javascript
import { useCounter } from 'react-timing-hooks'

// this will count upwards every second
const timerValue = useCounter(0)
return <span>{timerValue}</span>
```

## API

### Params

`useCounter(settings)`

| Name              | Default | Description                                      |
|:------------------|:--------|:-------------------------------------------------|
| settings.start    | `0`     | The initial value of the counter                 |
| settings.interval | `1000`  | The duration between each counter step           |
| settings.stepSize | `1`     | The amount that is added after each counter step |


### Return value

The current counter value (starting at `settings.start`). This will change every `settings.interval` ms by `settings.stepSize`.
