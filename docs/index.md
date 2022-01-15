# React Timing Hooks Documentation

## Table of Contents
* [Installation](#installation)
* [API](#api)
    * [Timeouts](#timeouts)
        * [useTimeout](#usetimeoutcallback-timeout)
        * [useTimeoutEffect](#usetimeouteffecteffectcallback-deps)
    * [Intervals](#intervals)    
        * [useInterval](#useintervalintervalcallback-delay)
        * [useTimer](#usetimerstart--0)
        * [useClock](#useclockstarttimeinmilliseconds--datenow-formatter--date-date--datetolocaletimestring)
    * [Animation](#animation)
        * [useAnimationFrame](#useanimationframecallback)
        * [useAnimationFrameLoop](#useanimationframeloopcallback-stop--false)
    * [Idle Callbacks](#idle-callbacks)   
        * [useIdleCallback](#useidlecallbackcallback-options)
        * [useIdleCallbackEffect](#useidlecallbackeffecteffectcallback-deps)

## Installation

```bash
# via npm
npm i react-timing-hooks

# via yarn
yarn add react-timing-hooks
```

**Note:** You have to install `react@16.8.0` (or higher), too, in order to use this package.

## API

### Timeouts

#### `useTimeout(callback, timeout)`

* `callback` — a function that will be invoked as soon as the timeout expires
* `timeout` — the timeout in milliseconds

The hook will take care of clearing the timeout on unmount, too.

Example: 

```javascript
import { useTimeout } from 'react-timing-hooks'

// Hide something after 2 seconds
const hideDelayed = useTimeout(() => setHide(true), 2000)

return <button onClick={hideDelayed}>Hide!</button>
```

#### `useTimeoutEffect(effectCallback, deps)`

* `effectCallback` — will receive two arguments: `timeout(f, timeout)` (which has the
same signature as a native `setTimeout`), and a `cleanup` function to manually clear the current timeout if that is desired.
* `deps` — is your regular `useEffect` dependency array

This works like a regular `useEffect` hook, except that it adds a `setTimeout` like function
to the callback args. Any timeout will be automatically cleared on unmount.

Example: 

```javascript
import { useTimeoutEffect } from 'react-timing-hooks'

// Delay the transition of a color by one second everytime it changes
useTimeoutEffect((timeout, clear) => {
  if (color) {
    timeout(() => transitionTo(color), 1000)
  }
}, [color])
```


### Intervals

#### `useInterval(intervalCallback, delay)`

* `intervalCallback` — will be run every _[delay]_ milliseconds
* `delay` — is the delay at which the callback will be run. If delay is `null` the interval will be suspended.

Example: 

```javascript
import { useInterval } from 'react-timing-hooks'

// Increase count every 200 milliseconds
const [count, setCount] = useState(0)
useInterval(() => setCount(count + 1), 200)
```


#### `useTimer(start = 0)`

* `start` — starting number (default is 0)

Example: 

```javascript
import { useTimer } from 'react-timing-hooks'

// this will count upwards every second
const timerValue = useTimer(0)
return <span>{timerValue}</span>
```

#### `useClock(startTimeInMilliseconds = Date.now(), formatter = (date: Date) => date.toLocaleTimeString())`

* `startTimeInMilliseconds` — a number in milliseconds where the time is supposed to start (defaults to `Date.now()`)
* `formatter` — a functions that turns the date that is updated every second into a string. The string will then be the output of the hook. Defaults to locale string. 

Example:

```javascript
import { useClock } from 'react-timing-hooks'

// this will show a time like 1:13:56 PM that is updated every second. Like a clock.
const currentTime = useClock()
return <span>{currentTime}</span>
```


### Animation

#### `useAnimationFrame(callback)`

* `callback` — a function that will be invoked on the next animation frame

Queued animation frame callbacks will be automatically canceled on unmount.



#### `useAnimationFrameLoop(callback, stop = false)`

* `callback` — a function that will be invoked in an animation frame loop
* `stop = false` — an optional parameter to stop/pause the loop. It can be resumed by setting it to false again.

Example: 

```javascript
import { useAnimationFrameLoop } from 'react-timing-hooks'

// Update canvas on every frame
const [stop, setStop] = useState(false)
const updateCanvas = () => { 
    // ... 
}
useAnimationFrameLoop(updateCanvas, stop)
```


### Idle Callbacks

#### `useIdleCallback(callback, options)`

* `callback` — a function that will be invoked as soon as the browser decides to run the idle callback
* `options` — options for `requestIdleCallback`

Any registered idle callbacks will be canceled on unmount.

**Note:** This hook will print a warning if the browser doesn't support `requestIdleCallback`.

Example: 

```javascript
import { useIdleCallback } from 'react-timing-hooks'

// Track button click when idle
const trackClickWhenIdle = useIdleCallback(trackClick)

return <button onClick={trackClickWhenIdle}>Track me!</button>
```



#### `useIdleCallbackEffect(effectCallback, deps)`

* `effectCallback` — will receive one argument `requestIdleCallback(f, opts)` that has the
same signature as the native [`requestIdleCallback`](https://developer.mozilla.org/en-US/docs/Web/API/Window/requestIdleCallback)
* `deps` — is your regular `useEffect` dependency array

This works like a regular `useEffect` hook, except that it adds a `requestIdleCallback` like function
to the callback args. Any registered idle callbacks will be canceled on unmount.

**Note:** This hook will print a warning if the browser doesn't support `requestIdleCallback`.

Example: 

```javascript
import { useIdleCallbackEffect } from 'react-timing-hooks'

// Track page view when browser is idle
useIdleCallbackEffect(onIdle => {
  if (page) {
    onIdle(() => trackPageView(page))
  }
}, [page])
```





