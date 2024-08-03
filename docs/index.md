---
layout: default
title: Quick Start
nav_order: 1
has_children: false
---

<img alt="logo" src="https://github.com/EricLambrecht/react-timing-hooks/raw/main/logo.png" width="680" />

# Quick Start
This is the documentation of react-timing-hooks.
{: .fs-6 .fw-300 }

[List of hooks](/react-timing-hooks/list-of-all-hooks/){: .btn .btn-primary .fs-5 .mb-4 .mb-md-0 .mr-2 }
[View it on GitHub][repo]{: .btn .fs-5 .mb-4 .mb-md-0 }

---

## Installation

```bash
# via npm
npm i react-timing-hooks

# via yarn
yarn add react-timing-hooks
```

{: .note }
Since this is a React package, you have to install React `^16.8.0`, `^17.0.0` or `^18.0.0`, too, in order to use this package.

## Getting started

Simply import the hook you need and use it in your React app! Here is an overview of all hooks in this package: [list of all hooks](/react-timing-hooks/list-of-all-hooks/).

{: .highlight-title }
> Typescript
>
> This package is developed in Typescript, so **everything is typed out of the box**. You don't need to install types seperately.
   
## Background

In general all of these hooks are more or less wrappers for standard javascript functions. But since they can be quite
a pain to handle in React components (leaks upon unmount etc.), I wrote this little package.

There are currently hooks available for:

* [setTimeout][timeout-mdn] (useTimeout, useTimeoutEffect, useThrottledState, ...)
* [setInterval][interval-mdn] (useInterval, useTimer, useClock, ...)
* [requestAnimationFrame][raf-mdn] (useAnimationFrame, useAnimationFrameLoop)
* [requestIdleCallback][idle-cb-mdn] (useIdleCallback, useIdleCallbackEffect)

**All hooks are documented on this page** (see sidebar). They should be pretty straight forward to use, but feel free
to add an issue on GitHub if you have any ideas for improvement.

{: .highlight-title }
> Package size / Treeshaking
> 
> This package is extremely small already (see [here](https://bundlephobia.com/result?p=react-timing-hooks)), but your bundle
> size will be even less affected by this package, because it's completely **tree-shakable**, i.e. only hooks you actually use
> will be bundled into your app js.

### Preventing leaks on unmount

One of the most cumbersome things when dealing with timeouts and intervals in React is the **boilerplate** you have to write in order to use them properly.

What you what normally do is to write clean-up code to manually clear pending timeouts/intervals in your React components. 
**With React Timing Hooks you don't have to do that.**

#### Example

For example: You might have a timeout that runs under a certain condition. In this case a cleanup
has to be done in a separate `useEffect` call that cleans everything up (but only on unmount).

Your code could look like this:

```javascript
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

```javascript
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

Memoization is important if you depend on callbacks in your hook dependency arrays. You **don't have to worry about memoization** of your callbacks (by wrapping stuff in `useCallback` for example). React Timing Hooks is taking care of that for you. So even if you pass a simple inline arrow function to one of these hooks, the return value (if there is one) will not change on every render but instead stay the same (i.e. it will be memoized).

This means something like this is safe to do:

```javascript
const [foo, setFoo] = useState(null)
const onFooChange = useTimeout(() => console.log('foo changed one second ago!'), 1000)

// the following effect will run only when "foo" changes, just as expected. "onFooChange" is memoized and safe to use in a dependency array.
useEffect(() => {
  onFooChange()
}, [foo, onFooChange])
```

[interval-mdn]: https://developer.mozilla.org/en-US/docs/Web/API/setInterval
[timeout-mdn]: https://developer.mozilla.org/en-US/docs/Web/API/setTimeout
[idle-cb-mdn]: https://developer.mozilla.org/en-US/docs/Web/API/Window/requestIdleCallback
[raf-mdn]: https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame
[repo]: https://github.com/EricLambrecht/react-timing-hooks