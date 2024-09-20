---
title: useOscillator
description: A React hook to create a oscillating boolean value.
parent: Loops & Intervals
nav_order: 6
---

# useOscillator

Use this hook if you want to have a **customizable oscillator** that toggles a boolean value 
every x  milliseconds (`settings.interval`). The initial value (`settings.initialValue`) must be defined by the user.

{: .note }
By default, the oscillator is _stopped_ on mount and has to be started manually.
If you want the oscillator to start automatically on mount, use `settings.startOnMount`.

{: .note }
Stopping the oscillator will also **reset the boolean value** to it's initial value by default.
However, this can be changed via `settings.resetOnStop`. You can manually reset it via the returned
`reset()` control-function.

#### Alternatives

- If you want a counter increments a number instead of toggling a boolean, take a look at the
  [useCounter()](/react-timing-hooks/loops-and-intervals/useCounter.html) hook.

## Example

### A oscillator timer that toggles between on and off every second

```javascript
import { useOscillator } from 'react-timing-hooks'

const [isOn] = useOscillator({ 
  start: false, 
  interval: 1000, 
  startOnMount: true
})

return <span>{isOn ? 'ON' : 'OFF'}</span>
```

## API

`useOscillator(settings)`
{: .fs-5 .fw-300 }

### Params

| Name                            | Default | Description                                                                                                     |
|:--------------------------------|:--------|:----------------------------------------------------------------------------------------------------------------|
| settings.initialValue           | -       | The initial value of the oscillator, i.e. `true` or `false`                                                     |
| settings.interval               | `1000`  | The duration between each oscillator step                                                                       |
| settings.startOnMount           | `false` | If true, the oscillator will immediately start on mount. If false, it has to be started manually via `start()`. |
| settings.resetOnStop            | `true`  | If true, the oscillator will reset to the start value on stop. If false, it won't.                              |
| settings.destroyIntervalOnPause | `true`  | If false, the interval is kept running in the background without doing anything until resumed.                  |


### Return value

An Array of `[value, oscillatorControls]`.

The first array item is the current oscillator value (starting at `settings.initialValue`). It will toggle every `settings.interval` ms.

The second value is an object of oscillator controls:

| Name      | Description                                                                                                                                  |
|:----------|:---------------------------------------------------------------------------------------------------------------------------------------------|
| isPaused  | A boolean that indicates whether the oscillator is currently paused                                                                          |
| isStopped | A boolean that indicates whether the oscillator is currently stopped. Meaning it cannot be resumed, but only restarted via `start()`.        |
| pause     | A function that will temporarily pause the oscillator. If `settings.destroyIntervalOnPause` is true it will destroy the underlying interval. |
| resume    | A function that resumes a paused oscillator.                                                                                                 |
| stop      | A function that stops the underlying interval. If `settings.resetOnStop` is true, this will reset the oscillator.                            |
| start     | A function that start's the oscillator.                                                                                                      |
| reset     | A function that resets the oscillator to it's initial value.                                                                                 |
