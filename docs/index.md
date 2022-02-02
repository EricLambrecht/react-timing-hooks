---
layout: default
title: Quick Start
nav_order: 1
has_children: false
---


# React Timing Hooks Documentation

## Installation

```bash
# via npm
npm i react-timing-hooks

# via yarn
yarn add react-timing-hooks
```

**Note:** You have to install React `^16.8.0` or `^17.0.0`, too, in order to use this package.
   
## Overview

In general all of these hooks are more or less wrappers for standard javascript functions. But since they can be quite
a pain to handle in React components (leaks upon unmount etc.), I wrote this little package.

There are currently hooks available for:

* setTimeout (useTimeout, useTimeoutEffect)
* setInterval (useInterval, useTimer, useClock)
* requestAnimationFrame (useAnimationFrame, useAnimationFrameLoop)
* requestIdleCallback (useIdleCallback, useIdleCallbackEffect)

The APIs of all hooks are documented on this page (see sidebar). They should be pretty straight forward, but feel free
to add an issue on GitHub if you have any ideas for improvement.

### Typescript / Treeshaking

This package is developed in Typescript, so everything is typed out of the box. You don't need to install types seperately.

### Package size

This package is extremely small already (see [here](https://bundlephobia.com/result?p=react-timing-hooks)), but your bundle
size will be even less affected by this package, because it's completely **tree-shakable**, i.e. only hooks you actually use
will be bundled into your app js.

### Preventing leaks on unmount

Normally, timeouts, intervals etc. would have to be cleaned up manually if used inside a React component. 
With React Timing Hooks you don't have to do that.

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

