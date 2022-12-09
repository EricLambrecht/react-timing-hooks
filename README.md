<img src="https://github.com/EricLambrecht/react-timing-hooks/raw/master/logo.png" width="680" />

[![npm](https://flat.badgen.net/npm/v/react-timing-hooks)](https://www.npmjs.com/package/react-timing-hooks)
[![minified](https://flat.badgen.net/bundlephobia/minzip/react-timing-hooks)](https://bundlephobia.com/result?p=react-timing-hooks)
![types](https://flat.badgen.net/npm/types/react-timing-hooks)
[![checks](https://flat.badgen.net/github/checks/EricLambrecht/react-timing-hooks)](https://github.com/EricLambrecht/react-timing-hooks)

## Features

* Several React hooks wrapping 
    * `requestAnimationFrame`
    * `setTimeout`
    * `setInterval`
    * `requestIdleCallback`
* Including "effect" versions and utility hooks like `useTimer`, `useAnimationFrameLoop`
* Full Typescript support  
* [Lightweight](https://bundlephobia.com/result?p=react-timing-hooks) (less than 1KB minzipped, no external dependencies)
* Tree-shakable

## Installation

```bash
# via npm
npm i react-timing-hooks

# via yarn
yarn add react-timing-hooks
```

## Usage
   
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
   
## Why bother?

Writing a timeout or anything similar requires a lot of boilerplate (if you don't do it quick and dirty).
This library is supposed to give you easy access to those functionalities while keeping your code clean.

For example: You might have a timeout that runs under a certain condition. In this case a cleanup
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

  useTimeoutEffect((timeout) => {
    if (depA && depB) {
      timeout(() => setOutput('Hello World'), 1000)
    }
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

// the following effect will run only when "foo" changes, just as expected. "onFooChange" is memoized and safe to use in a dependency array.
useEffect(() => {
  onFooChange()
}, [foo, onFooChange])
```
  

## Contributing

see [CONTRIBUTING.md](https://github.com/EricLambrecht/react-timing-hooks/blob/master/CONTRIBUTING.md)
