---
title: useClock
description: A React hook to show the current time
parent: Loops & Intervals
nav_order: 7
---

# useClock

This hook creates a sort of clock, i.e. a reactive time-based value that updates **every second**.

The output of useClock is easily customizable via the `options` argument, see [below](#params).

{: .highlight-title }
> Typescript
>
> `useClock` is also generic (by default `useClock<string>` is used). The generic type has to be specified if a 
> custom formatter (see `options.customFormatter`) is used that returns something else than a string.

## Example

```javascript
import { useClock } from 'react-timing-hooks'

// this will show a time like 1:13:56 PM that is updated every second. Like a clock.
const [currentTime, { start, stop, ...rest }] = useClock()
return <span>{currentTime}</span>
```

## API

`useClock<T=string>(options: ClockOptions): [T, CounterControls]`
{: .fs-5 .fw-300 }

### Params

`Date.toLocaleTimeString` is used to output the time. The output can be formatted via `options.locales` and/or `options.dateTimeFormatOptions`. 

Alternatively, a completely custom formatter can also be used (see `options.customFormatter`).

| Name                              | Type                         | Default      | Description                                                                                                  |
|:----------------------------------|:-----------------------------|:-------------|:-------------------------------------------------------------------------------------------------------------|
| `options`                         | `object`                     | `undefined`  | An object of options, see below                                                                              |
| `options.locales`                 | `string or string[]`         | `undefined`  | Locales forwarded to `Date.toLocaleTimeString()`, ignored if custom formatter is used.                       |
| `options.dateTimeFormatOptions`   | `Intl.DateTimeFormatOptions` | `undefined`  | Options forwarded to `Date.toLocaleTimeString()`, ignored if custom formatter is used.                       |
| `options.customFormatter`         | `(date: Date) => T`          | `undefined`  | Alters the return value of `useClock`. Must return `T`.                                                      |
| `options.startTimeInMilliseconds` | `number`                     | `Date.now()` | A number in milliseconds, marking the start time of the clock.                                               |
| `options.keepPausedClockRunningInBackground` | `boolean` | `true` | If true, pausing will only stop the output-update but not the underlying clock, so that it resumes at the correct time if resumed. |

### Generic type

Defaults to `string`. Does have to be set only when a custom formatter is used.

### Return value

An Array with two elements:
 - `0`: A formatted time string (by default) or the output of `options.customFormatter` (if set) – updated every second.
 - `1`: Controls to pause, resume, start and stop the clock. Use `pause()` if you want the clock to resume at the correct time.

