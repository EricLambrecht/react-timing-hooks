---
title: useClock
parent: Intervals
nav_order: 3
---

#useClock

This hook can be used to render a clock, i.e. a time-string that updates every second.

## Example

## Params

> `useClock(startTimeInMilliseconds, formatter)`

> useClock(startTimeInMilliseconds, formatter)

```javascript
useClock(startTimeInMilliseconds, formatter)
```

useClock(startTimeInMilliseconds = Date.now(), formatter = (date: Date) => date.toLocaleTimeString())
