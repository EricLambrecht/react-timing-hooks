---
title: useThrottledState
parent: General Utility
nav_order: 1
---

# useThrottledState

Manage rapidly changing state in your application without producing too many updates/re-renders!
{: .fs-6 .fw-300 }

This hook allows you to throttle state updates, which in turn can throttle re-rerenders and/or effect
updates. If you have a component, service, or interval that rapidly fires state updates, this hook allows
you to do that without forcing an _actual_ update within React which would trigger a re-render.

This is also helpful if you have a `useEffect()` hook that you don't want to run too often.

Keep in mind: This means that not every update is necessarily immediately reflected in the
state variable, it might only be _queued_ for an update. But do not worry: no updates will be lost. 
Eventually the latest call to the `setState` method will always be processed and cause an actual update.

## Example

```javascript
import { useThrottledState } from 'react-timing-hooks'

const Comp = () => {
    // Allow state to be only updated once every second.
    const [count, setCount] = useThrottledState(0, 1_000)

    // Imagine you have some sort of rapid firing state updates. 
    // This example uses a very short interval of 10ms, just as an example.
    useInterval(() => setCount(count + 1), 10)

    // Because of "useThrottledState", the actual value of "count"
    // will only be changed every second. So you'll see something like
    // 1, 11, 21, 31, ...
    return <span>{count}</span>
}
```

## API

`useThrottledState<T>(initialState: T, delayInMs: number)`
{: .fs-5 .fw-300 }

### Params

| Name             | Description                                                           |
|:-----------------|:----------------------------------------------------------------------|
| initialState     | The initial state, like in `useState()`.                              |
| delayInMs        | the minimum delay between two state updates.                          |

### Return value

An array of form: [state: T, setState: (newState: T) => void], similar to `useState()`.

| Name             | Description                                                                                         |
|:-----------------|:----------------------------------------------------------------------------------------------------|
| state            | The current (albeit throttled) state value.                                                         |
| setState         | The setter to queue a change/update to the state. Will be processed as soon as the delay allows it. |

### Generic type

Usage is similar to `useState<T>()`. The generic type `T` defines the type of the state.