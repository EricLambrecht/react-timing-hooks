---
title: useClock
parent: Intervals
nav_order: 3
---

# useClock

This hook can be used to render a reactive "text clock", i.e. a time-string that updates every second.

## Example

```javascript
import { useClock } from 'react-timing-hooks'

// this will show a time like 1:13:56 PM that is updated every second. Like a clock.
const currentTime = useClock()
return <span>{currentTime}</span>
```

## API

### Params

`useClock(startTimeInMilliseconds, formatter)`

| Name                        | Default                                     | Description                                                          |
|:----------------------------|:--------------------------------------------|:---------------------------------------------------------------------|
| startTimeInMilliseconds     | `Date.now()`                                | A number in milliseconds, marking the start time.                    |
| formatter                   | `(date: Date) => date.toLocaleTimeString()` | A function that turns the date which is updated every second into a string. This string will then be the output of the hook. |

### Return value

The time string – updated every second.
