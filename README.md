# react-timing-hooks

This package contains a bunch of hooks that allow you to make use of `setTimeout`, 
`setInterval`, `setIdleCallback` and `requestAnimationFrame` in your react-components _without_
having to worry about handling "IDs" or the clean up of leaking timers etc. Apart from that
the hooks are quite easy to use. 

Oh, and the lib is super light-weight, too, since it doesn't include any other dependencies!

#### TL;DR

* less boilerplate to write
* simple API
* super leight-weight

## Table of Contents
* [Docs and examples](#Documentation)
  * [useTimeout](#usetimeoutcallback-timeout)
  * [useTimeoutEffect](#usetimeouteffecteffectcallback-deps)
  * [useInterval](#useintervalintervalcallback-delay)
  * [useAnimationFrame](#useanimationframecallback)
  * [useAnimationFrameLoop](#useanimationframeloopcallback)
  * [useIdleCallback](#useidlecallbackcallback-options)
  * [useIdleCallbackEffect](#useidlecallbackeffecteffectcallback-deps)
* [Why bother?](#why-bother)

## Documentation

### `useTimeout(callback, timeout)`

* `callback` - a function that will be invoked as soon as the timeout expires

* `timeout` - the timeout in milliseconds

Example: 

```javascript
// Hide something after 2 seconds
const hideDelayed = useTimeout(() => setHide(true), 2000)

return <button onClick={hideDelayed}>Hide!</button>
```

### `useTimeoutEffect(effectCallback, deps)`

* `effectCallback` - will receive one argument `timeout(f, timeout)` that has the
same signature as a native `setTimeout`

* `deps` - is your regular `useEffect` dependency array

This works like a regular `useEffect` hook, except that it adds a `setTimeout` like function
to the callback args.

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

* `intervalCallback` - will be run every _[delay]_ (second arg) seconds

* `delay` - is the delay at which the callback will be run. If delay is `null` the interval will be suspended.

Example: 

```javascript
// Increase count every 200 milliseconds
const [count, setCount] = useState(0)
useInterval(() => setCount(count + 1), 200)
```

### `useAnimationFrame(callback)`

* `callback` - a function that will be invoked on the next animation frame


### `useAnimationFrameLoop(callback)`

* `callback` - a function that will be invoked in an animation frame loop

Example: 

```javascript
// Update canvas on every frame
const updateCanvas () => { 
    // ... 
}
useAnimationFrameLoop(updateCanvas)
```


### `useIdleCallback(callback, options)`

* `callback` - a function that will be invoked as soon as the browser decides to run the idle callback

* `options` - options for `requestIdleCallback`

Example: 

```javascript
// Track button click when idle
const trackClickWhenIdle = useIdleCallback(trackClick)

return <button onClick={trackClickWhenIdle}>Track me!</button>
```

### `useIdleCallbackEffect(effectCallback, deps)`

* `effectCallback` - will receive one argument `requestIdleCallback(f, opts)` that has the
same signature as the native [`requestIdleCallback`](https://developer.mozilla.org/en-US/docs/Web/API/Window/requestIdleCallback)

* `deps` - is your regular `useEffect` dependency array

This works like a regular `useEffect` hook, except that it adds a `requestIdleCallbackEffect` like function
to the callback args.

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
