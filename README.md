# react-timing-hooks

This library contains (or will contain) a bunch of hooks that can be used to trigger effects
containing timeouts, intervals etc. without having to worry about storing "timeoutIds" or proper
clean up of leaking timers. Apart from that this lib is super light-weight, since it doesn't include
any other dependencies.

#### TL;DR

* less boilerplate to write
* no new API to learn (same es `useEffect`)
* super leight-weight

## Examples

You often have timeouts that run under a certain condition. In these cases a cleanup
often has to be done in a separate `useEffect` call that really only cleans up on
unmount. 

You might have code like this for example:

```javascript
  import { useEffect } from 'react'

  // ... 

  const timeoutId = useRef(null)

  useEffect(() => {
    if (depA && depB) {
      timeoutId.current = setTimeout(() => doSomething(), 1000)
    }
  }, [depA, depB])

  useEffect(() => {
    return function onUnmount() {
      if (timeoutId.current !== null) {
        clearTimeout(timeoutId.current)
      }
    }
  }, [timeoutId])
```

With `react-timing-hooks` you can just write:

```javascript
  import { useTimeoutEffect } from 'react-timing-hooks'

  // ... 
  
  useTimeoutEffect((timeout) => {
    if (depA && depB) {
      timeout(() => doSomething(), 1000)
    }
  }, [depA, depB])
```

`react-timing-hooks` will automatically take care of cleaning up the timeouts for you.

## Documentation

**Note**: At this moment, `useIntervalEffect`, and hooks for `requestAnimationFrame` and `requestIdleCallback`
are still in development.

### `useTimeoutEffect(effectCallback, deps)`

* `effectCallback` will receive one argument `timeout(f, timeout)` that has the
same signature as a native `setTimeout`

* `deps` is your regular `useEffect` dependency array

Example: 

```javascript
// Delay the transition of a color by one second everytime it changes
useTimeoutEffect(timeout => {
  if (color) {
    timeout(() => transitionTo(color), 1000)
  }
}, [color])
```

### `useInterval(intervalCallback, deps)`

* `intervalCallback` will be run every _[delay]_ (second arg) seconds

* `delay` is the delay at which the callback will be run. If delay is `null` the interval will be suspended.

Example: 

```javascript
// Increase count every 200 milliseconds
const [count, setCount] = useState(0)
useInterval(() => setCount(count + 1), 200)
```