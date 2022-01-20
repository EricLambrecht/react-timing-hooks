---
title: useInterval
parent: Intervals
nav_order: 1
---

# useInterval

A react wrapper for [setInterval](https://developer.mozilla.org/en-US/docs/Web/API/setInterval) – no leaks on unmount!
{: .fs-6 .fw-300 }

This hook allows you to do certain actions at a regular interval, i.e. **loops**. 
It is a react-wrapper for the native javascript function `setInterval`.

If you want to loop very fast, maybe because you want to animate something, you might want to use `useAnimationFrameLoop` instead, which yields better performance in these cases.

## Example

```javascript
import { useInterval } from 'react-timing-hooks'

// Increase count every 200 milliseconds
const [count, setCount] = useState(0)
useInterval(() => setCount(count + 1), 200)
```

## API

### Params

> useInterval(callback, delay)

| Name         | Description                                                          |
|:-------------|:---------------------------------------------------------------------|
| callback     | a function that will be invoked as soon as the timeout expires       |
| delay        | the delay between executions of `callback`. See [setInterval()](https://developer.mozilla.org/en-US/docs/Web/API/setInterval). 

### Return value

This hook has no return value.

## Notes

Pending intervals will be cleared upon unmount.
