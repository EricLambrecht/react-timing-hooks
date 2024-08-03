---
title: useTimer
description: A React hook to create a reactive timer. Runs every second.
parent: Loops & Intervals
nav_order: 4
---

# useTimer

Use this hook if you want to create a timer, i.e. a reactive number that is **incremented every second**.

{: .note }
By default, the timer is _stopped_ on mount and has to be started manually. If you want the timer to start immediately on mount, use `settings.startOnMount`.

{: .note }
Stopping the timer will also reset the timer to it's initial value per default. However, this can be changed via `settings.resetOnStop`. You can manually reset it via the returned `reset()` control-function.


#### Alternatives

- For a more versatile hook, look at [useCounter()](/react-timing-hooks/loops-and-intervals/useCounter.html).
- For a "reverse timer", see [useCountdown()](/react-timing-hooks/loops-and-intervals/useCountdown.html).

## Example

```javascript
import { useTimer } from 'react-timing-hooks'

// this will count upwards every second
const [timerValue] = useTimer(0, { startOnMount: true })
return <span>{timerValue}</span>
```

## API

`useTimer(start = 0, settings = {})`
{: .fs-5 .fw-300 }

### Params

| Name                  | Default    | Description                                                                                                |
|:----------------------|:-----------|:-----------------------------------------------------------------------------------------------------------|
| start                 | `0`        | The initial value of the timer                                                                             |
| settings.startOnMount | `false`    | If true, the timer will immediately start on mount. If false, it has to be started manually via `start()`. |
| settings.resetOnStop  | `true`     | If true, the timer will reset to the start value on stop. If false, it won't.                              |
| settings.destroyIntervalOnPause  | `true`  | If false, the interval is kept running without doing anything until resumed.                      |


### Return value

An array of format `[timerValue, counterControls]`, the first value is the current countdown value. This will be incremented by 1, every second.

The second value is an object of counter controls (start, stop, pause, etc.), see [useCounter()](/react-timing-hooks/loops-and-intervals/useCounter.html#return-value).


