---
title: useCounter
parent: Loops & Intervals
nav_order: 2
---

# useCounter

Use this hook if you want to have a **customizable counter** that changes a value by a 
certain amount (`settings.stepSize`) every x  milliseconds (`settings.interval`).
A start value (`settings.start`) can also be defined.

{: .note }
By default, the counter is _stopped_ on mount and has to be started manually. 
If you want the counter to start automatically on mount, use `settings.startOnMount`.

Stopping the counter will also **reset the counter** to it's initial start-value per default. 
However, this can be changed via `settings.resetOnStop`. You can manually reset it via the returned
`reset()` control-function.

#### Alternatives

- If you want a counter that counts up by 1 every second, you can use the 
[useTimer()](/react-timing-hooks/intervals-api/useTimer.html) hook.

- If you want a counter that starts at a certain number and stops at another, use 
[useCountdown()](/react-timing-hooks/intervals-api/useCountdown.html).

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

`useCounter(settings)`
{: .fs-5 .fw-300 }

### Params

| Name                  | Default | Description                                                                                                  |
|:----------------------|:--------|:-------------------------------------------------------------------------------------------------------------|
| settings.start        | `0`     | The initial value of the counter                                                                             |
| settings.interval     | `1000`  | The duration between each counter step                                                                       |
| settings.stepSize     | `1`     | The amount that is added after each counter step                                                             |
| settings.startOnMount | `false` | If true, the counter will immediately start on mount. If false, it has to be started manually via `start()`. |
| settings.resetOnStop  | `true`  | If true, the counter will reset to the start value on stop. If false, it won't.                              |
| settings.destroyIntervalOnPause  | `true`  | If false, the interval is kept running without doing anything until resumed.                      |


### Return value

An Array of `[counterValue, counterControls]`.

The first array item is the current counter value (starting at `settings.start`). This will change every `settings.interval` ms by `settings.stepSize`.

The second value is an object of counter controls:

| Name      | Description                                                                                                                         |
|:----------|:------------------------------------------------------------------------------------------------------------------------------------|
| isPaused  | A boolean that indicates whether the counter is currently paused                                                                    |
| isStopped | A boolean that indicates whether the counter is currently stopped. Meaning it cannot be resumed, but only restarted via `start()`.  |
| pause     | A function that will temporarily pause the counter. If `settings.destroyIntervalOnPause` is true it will destroy the underlying interval.|
| resume    | A function that resumes a paused counter.                                                                                           |
| stop      | A function that stops the underlying interval. If `settings.resetOnStop` is true, this will reset the counter.                      |
| start     | A function that start's the counter.                                                                                                |
| reset     | A function that resets the counter to it's starting value.                                                                          |
