# React Timing Hooks Documentation

## Table of Contents
* [Installation](#installation)
* [API reference (with examples)](#api)
  * [useTimeout](#usetimeoutcallback-timeout)
  * [useTimeoutEffect](#usetimeouteffecteffectcallback-deps)
  * [useInterval](#useintervalintervalcallback-delay)
  * [useTimer](#usetimerstart--0)
  * [useAnimationFrame](#useanimationframecallback)
  * [useAnimationFrameLoop](#useanimationframeloopcallback)
  * [useIdleCallback](#useidlecallbackcallback-options)
  * [useIdleCallbackEffect](#useidlecallbackeffecteffectcallback-deps)

## Installation

```bash
# via npm
npm i react-timing-hooks

# via yarn
yarn add react-timing-hooks
```

## API

### `useTimeout(callback, timeout)`

* `callback` - a function that will be invoked as soon as the timeout expires

* `timeout` - the timeout in milliseconds

Example: 

```javascript
// Hide something after 2 seconds
const hideDelayed = useTimeout(() => setHide(true), 2000)

return <button onClick={hideDelayed}>Hide!</button>
```

------

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

------

### `useInterval(intervalCallback, delay)`

* `intervalCallback` - will be run every _[delay]_ milliseconds

* `delay` - is the delay at which the callback will be run. If delay is `null` the interval will be suspended.

Example: 

```javascript
// Increase count every 200 milliseconds
const [count, setCount] = useState(0)
useInterval(() => setCount(count + 1), 200)
```

------

### `useTimer(start = 0)`

* `start` - starting number (default is 0)

Example: 

```javascript
// this will count upwards every second
const timerValue = useTimer(0)
return <span>{timerValue}</span>
```

------

### `useAnimationFrame(callback)`

* `callback` - a function that will be invoked on the next animation frame

------

### `useAnimationFrameLoop(callback, stop = false)`

* `callback` - a function that will be invoked in an animation frame loop

* `stop = false` - an optional parameter to stop/pause the loop. It can be resumed by setting it to false again.

Example: 

```javascript
// Update canvas on every frame
const [stop, setStop] = useState(false)
const updateCanvas = () => { 
    // ... 
}
useAnimationFrameLoop(updateCanvas, stop)
```

------

### `useIdleCallback(callback, options)`

* `callback` - a function that will be invoked as soon as the browser decides to run the idle callback

* `options` - options for `requestIdleCallback`

**Note:** This hook will print a warning if the browser doesn't support `requestIdleCallback`.

Example: 

```javascript
// Track button click when idle
const trackClickWhenIdle = useIdleCallback(trackClick)

return <button onClick={trackClickWhenIdle}>Track me!</button>
```

------

### `useIdleCallbackEffect(effectCallback, deps)`

* `effectCallback` - will receive one argument `requestIdleCallback(f, opts)` that has the
same signature as the native [`requestIdleCallback`](https://developer.mozilla.org/en-US/docs/Web/API/Window/requestIdleCallback)

* `deps` - is your regular `useEffect` dependency array

This works like a regular `useEffect` hook, except that it adds a `requestIdleCallback` like function
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
