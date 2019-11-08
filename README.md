# react-timing-hooks

This library contains (or will contain) a bunch of hooks that can be used to trigger effects
containing timeouts, intervals etc. without having to worry about storing "timeoutIds" or proper
clean up of leaking timers. Apart from that this lib is super light-weight, since it doesn't include
any other dependencies.

**This package is still in alpha. It is not yet feature complete.** 

#### TL;DR

* less boilerplate to write
* simple API
* super leight-weight

## Table of Contents
* [Docs and examples](#Documentation)
  * [useTimeout](#usetimeoutcallback-timeout)
  * [useTimeoutEffect](#usetimeouteffecteffectcallback-deps)
  * [useInterval](#useintervalintervalcallback-delay)
  * [useIdleCallbackEffect](#useidlecallbackeffecteffectcallback-deps)
* [Why bother?](#why-bother)

## Documentation

**Note**: A hook for `requestAnimationFrame` and an interval-versions of `requestIdleCallback` is still in development

### `useTimeout(callback, timeout)`

* `callback` a function that will be invoked as soon as the timeout expires

* `timeout` the timeout in milliseconds

Example: 

```javascript
// Hide something after 2 seconds
const hideDelayed = useTimeout(() => setHide(true), 2000)

return <button onClick={hideDelayed}>Hide!</button>
```

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

### `useInterval(intervalCallback, delay)`

* `intervalCallback` will be run every _[delay]_ (second arg) seconds

* `delay` is the delay at which the callback will be run. If delay is `null` the interval will be suspended.

Example: 

```javascript
// Increase count every 200 milliseconds
const [count, setCount] = useState(0)
useInterval(() => setCount(count + 1), 200)
```

### `useIdleCallbackEffect(effectCallback, deps)`

* `effectCallback` will receive one argument `requestIdleCallback(f, opts)` that has the
same signature as the native [`requestIdleCallback`](https://developer.mozilla.org/en-US/docs/Web/API/Window/requestIdleCallback)

* `deps` is your regular `useEffect` dependency array

**Note:** This hook will print a warning if the browser doesn't support `requestIdleCallback`.

Example: 

```javascript
// Track page view when browser is idle
useIdleCallbackEffect(onIdle => {
  if (page) {
    onIdle(() => trackPageView(page))
  }
}, [page])
```


## Why bother?

Writing a timeout or anything similar requires a lot of boilerplate (if you don't do it quick and dirty).
This library is supposed to give you easy access to those functionalities while keeping your code clean.

For example: You might have a timeout that runs under a certain condition. In this case a cleanup
has to be done in a separate `useEffect` call that cleans everything up (but only on unmount).

Your code could look like this:

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
  useEffect((timeout) => {
    if (depA && depB) {
      timeout(() => doSomething(), 1000)
    }
  }, [depA, depB])
```

In this case `react-timing-hooks` automatically took care of cleaning up the timeout for you (if the component is mounted for less than a second for instance).
