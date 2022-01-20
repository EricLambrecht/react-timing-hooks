---
title: useTimeout
parent: Timeouts
---

# useTimeout

Use this hook if you want to create a function/handler that executes once after a specific amount of time.
This can be used to debounce certain event handlers for example.

If you want to execute a timeout every time a certain value changes, `useTimeoutEffect` might be better suited.

## Example

```javascript
import { useTimeout } from 'react-timing-hooks'

// Hide something after 2 seconds
const hideDelayed = useTimeout(() => setHide(true), 2000)

return <button onClick={hideDelayed}>Hide!</button>
```

## Params

> `useTimeout(callback, timeout)`

| name         | description                                                          |
|:-------------|:---------------------------------------------------------------------|
| callback     | a function that will be invoked as soon as the timeout expires       |
| timeout      | the timeout in milliseconds

## Return value

A function will be returned, that - once executed - will run the `callback`-function after `{timeout}` milliseconds

## Notes

This hook will automatically clear any pending timeout on unmount.
