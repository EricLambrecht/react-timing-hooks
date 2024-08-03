---
title: useCountdown
description: A React hook to create a reactive countdown
parent: Loops & Intervals
nav_order: 5
---

# useCountdown

10…, 9…, 8…, 7…
{: .fs-6 .fw-300 }

Use this hook if you want to create a **countdown**, i.e. a reactive number that is **decremented every second**.
The hook will stop its interval automatically when it reaches the end.

The event callback **`options.onEnd()`** will be called as soon **as the end value is reached**.

{: .note }
By default, the countdown is _stopped_ on mount and has to be started manually. 
If you want the countdown to start automatically on mount, use `options.startOnMount`.

This hook is similar to [useTimer()](/react-timing-hooks/loops-and-intervals/useTimer.html) which counts _up_ every second, but does not have an end value.
If you need a countdown that counts *upwards*, you can use `options.stepSize` and change it to `1` or higher.

#### Alternatives

For a more freedom/versatility, you can use [useCounter()](/react-timing-hooks/loops-and-intervals/useCounter.html).

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

`useCountdown(start = 0, settings = {})`
{: .fs-5 .fw-300 }

### Params

| Name                  | Default       | Description                                                                                                  |
|:----------------------|:--------------|:-------------------------------------------------------------------------------------------------------------|
| start                 | _is required_ | The initial value of the countdown                                                                           |
| settings.startOnMount | `false`       | If true, the counter will immediately start on mount. If false, it has to be started manually via `start()`. |
| settings.resetOnStop  | `false`       | If true, the counter will reset to it's starting value on stop/reaching it's end. If false, it won't.        |



### Return value

An array of format `[countdownValue, intervalControls]`, the first value is the current countdown value.

The second value is an object of counter controls (start, stop, pause, etc.), see [useCounter()](/react-timing-hooks/loops-and-intervals/useCounter.html#return-value).

## Note

This is essentially a counter (`useCounter`) with `settings.stepSize` set to `1` and `interval` set to `1000`.
Use `useCounter` if you want a more customized timer.
