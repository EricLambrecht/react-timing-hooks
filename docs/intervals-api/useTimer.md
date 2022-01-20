---
title: useTimer
parent: Intervals
nav_order: 2
---

# useTimer

Use this hook if you want to create a simple timer, i.e. a reactive number that is incremented every second.

## Example

```javascript
import { useTimer } from 'react-timing-hooks'

// this will count upwards every second
const timerValue = useTimer(0)
return <span>{timerValue}</span>
```

## API

### Params

`useTimer(start = 0)`

| Name             | Default | Description                     |
|:-----------------|:--------|:--------------------------------|
| start            | `0`     | The initial value               |


### Return value

The current value. This will change every second.

## Note

Things like "step", or "delay" might be added in the future to customize this hook further. Contact me via GitHub-Issue if you need this.
