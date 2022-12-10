<img alt="logo" src="https://github.com/EricLambrecht/react-timing-hooks/raw/master/logo.png" width="680" />

[![npm](https://flat.badgen.net/npm/v/react-timing-hooks)](https://www.npmjs.com/package/react-timing-hooks)
[![minified](https://flat.badgen.net/bundlephobia/minzip/react-timing-hooks)](https://bundlephobia.com/result?p=react-timing-hooks)
![types](https://flat.badgen.net/npm/types/react-timing-hooks)
[![checks](https://flat.badgen.net/github/checks/EricLambrecht/react-timing-hooks)](https://github.com/EricLambrecht/react-timing-hooks)

## Wow! What's this?!

This is a very little package with **React hooks wrapping time-related Vanilla JS functions**, so you can use them with minimal effort in your React apps without having to worry about manual clean up, testing, or typing (if you use Typescript).

### Feature Overview

* Several React hooks **wrapping Vanilla JS functions** like:
  * `requestAnimationFrame()`
  * `setTimeout()`
  * `setInterval()`
  * `requestIdleCallback()`
* **Versatile API**, often including "callback" _and_ "effect" versions
* Additional **utility hooks** like `useTimer`, `useAnimationFrameLoop` or `useClock`
* Full **Typescript** support
* **[Lightweight](https://bundlephobia.com/result?p=react-timing-hooks)** (less than 1KB minzipped, no transitive dependencies!)
* **Tree-shakable** — You only bundle what you use!
* ... and it **saves a lot of code**
  * **Automatic clean-ups** of pending timers, intervals etc. (e.g. if your component un-mounts before a timer triggers)
  * callbacks are automatically **memoized**
  * All hooks are already **tested**


## Installation

```bash
# via npm
npm i react-timing-hooks

# via yarn
yarn add react-timing-hooks
```

## Examples

#### `useTimeout()`: Delay a button click action
```jsx harmony
import { useState } from 'react'
import { useTimeout } from 'react-timing-hooks'

const TimeoutRenderer = () => {
  const [output, setOutput] = useState(null)
  const onButtonClick = useTimeout(() => setOutput('Hello World'), 1000)

  return <div>
    <button onClick={onButtonClick}>Start timeout!</button>
    <p>{output}</p>
  </div>
}
```

#### `useTimeout()`: Delay a button click action
```jsx harmony
import { useState } from 'react'
import { useTimeout } from 'react-timing-hooks'

const TimeoutRenderer = () => {
  const [output, setOutput] = useState(null)
  const onButtonClick = useTimeout(() => setOutput('Hello World'), 1000)

  return <div>
    <button onClick={onButtonClick}>Start timeout!</button>
    <p>{output}</p>
  </div>
}
```

#### `useTimer`: Display how long the user has been browsing
```jsx harmony
import { useState } from 'react'
import { useTimer } from 'react-timing-hooks'

const BrowsingTime = () => {
  const elapsedSeconds = useTimer()
  return <span>You've been browsing this page for {elapsedSeconds} seconds.</span>
}
```

#### `useClock`: Display the current time, in real-time
```jsx harmony
import { useState } from 'react'
import { useTimeout } from 'react-timing-hooks'

const Clock = () => {
  // This will show a time like 1:13:56 PM (supports localized formats as well).
  // The displayed time will update every second
  const currentTime = useClock()
  return <span>{currentTime}</span>
}
```

#### `useAnimationFrameLoop`: Create an animation frame loop

```jsx harmony
import { useState } from 'react'
import { useAnimationFrameLoop } from 'react-timing-hooks'

const AnimationFrameCounter = ({ depA, depB }) => {
  const [count, setCount] = useState(0)
  const [stop, setStop] = useState(false)

  useAnimationFrameLoop(() => {
    setCount(count + 1)
  }, stop)
  
  return (
     <div>
      <p>{count}</p>
      <button onClick={() => setStop(!stop)}>
        Stop counting
      </button>
    </div>
  )
}
```   

## Documentation

[https://ericlambrecht.github.io/react-timing-hooks/](https://ericlambrecht.github.io/react-timing-hooks/)

## Why does this exist?

Writing a timeout or anything similar requires a lot of **boilerplate** (if you don't do it quick and dirty).
This library is supposed to give you easy access to those functionalities while keeping your code clean and concise. 
You will **not** have to manually clean up timers or intervals (but you still can!).
Additionally, many frequent use cases have their own utility hook, like `useClock` or `useAnimationFrameLoop`.
Needless to say, every hook is already tested and typed (so you don't have to).

### Some "Before-/After-Code"

A simple timeout triggered by a button click for example would usually be written like so:

```jsx harmony
import { useEffect } from 'react'

const TimeoutRenderer = () => {
  const [isHidden, setIsHidden] = useState(false)
  const [id, setId] = useRef(null)
  const onButtonClick = () => {
    id.current = setTimeout(() => setOutput('Hello World'), 1000)
  }
  
  // clean up the timeout on unmount
  useEffect(() => {
    return () => {
      clearTimeout(id.current)
    }
  }, [id])
    
  return <div>
    <button onClick={onButtonClick}>Start timeout!</button>
    {isHidden && <p>Hide this message!</p>}
  </div>
}
```

With `react-timing-hooks` it would look like this:

```jsx harmony
import { useState } from 'react'
import { useTimeout } from 'react-timing-hooks'

const TimeoutRenderer = () => {
  const [isHidden, setIsHidden] = useState(false)
  const onButtonClick = useTimeout(() => setOutput('Hello World'), 1000)

  return <div>
    <button onClick={onButtonClick}>Start timeout!</button>
    {isHidden && <p>Hide this message!</p>}
  </div>
}
```

**Another example:** You might have a timeout that runs under a certain condition. In this case a cleanup
has to be done in a separate `useEffect` call that cleans everything up (but only on unmount).

Your code could look like this:

```jsx harmony
import { useEffect } from 'react'

const TimeoutRenderer = ({ depA, depB }) => {
  const [output, setOutput] = useState(null)
  const timeoutId = useRef(null)

  useEffect(() => {
    if (depA && depB) {
      timeoutId.current = setTimeout(() => setOutput('Hello World'), 1000)
    }
  }, [depA, depB])

  useEffect(() => {
    return function onUnmount() {
      if (timeoutId.current !== null) {
        clearTimeout(timeoutId.current)
      }
    }
  }, [timeoutId])

  return output ? (
    <div>{output}</div>
  ) : null
}
```

With `react-timing-hooks` you can just write:

```jsx harmony
import { useState } from 'react'
import { useTimeoutEffect } from 'react-timing-hooks'

const TimeoutRenderer = ({ depA, depB }) => {
  const [output, setOutput] = useState(null)

  useTimeoutEffect((timeout, clearAll) => {
    if (depA && depB) {
      timeout(() => setOutput('Hello World'), 1000)
    }
    // you could even add more timeouts in this effect without any more boilerplate
  }, [depA, depB])

  return output ? (
    <div>{output}</div>
  ) : null
}
```

In this case `react-timing-hooks` automatically took care of cleaning up the timeout for you (if the component is mounted for less than a second for instance).

### Memoization

You **don't have to worry about memoization** of your callbacks (by using `useCallback`) for example. React Timing Hooks is taking care of that for you. So even if you pass a simple inline arrow function to one of these hooks, the return value (if there is one) will not change on every render but instead stay the same (i.e. it will be memoized).

This means something like this is safe to do:

```javascript
const [foo, setFoo] = useState(null)
const onFooChange = useTimeout(() => console.log('foo changed one second ago!'), 1000)

// the following effect will run only when "foo" changes, just as expected.
// "onFooChange" is memoized and safe to use in a dependency array.
useEffect(() => {
  onFooChange()
}, [foo, onFooChange])
```

### Bundle Size

The whole lib is tree-shakable, i.e. only hooks you actually use end up in your bundle.
So far, we also do not use any transitive dependencies. So don't worry about the bundle size.

But check for yourself: https://bundlephobia.com/result?p=react-timing-hooks

## Contributing

see [CONTRIBUTING.md](https://github.com/EricLambrecht/react-timing-hooks/blob/master/CONTRIBUTING.md)
