---
layout: default
title: List of all hooks
nav_order: 6
has_children: false
---

# A list of all hooks

In case you wonder where to find them.
{: .fs-6 .fw-300 }

## By Javascript function

#### Set Timeout | [MDN][timeout-mdn]
- [useTimeout](/react-timing-hooks/callbacks/useTimeout.html)
- [useTimeoutEffect](/react-timing-hooks/effects/useTimeoutEffect.html)

#### Set Interval | [MDN][interval-mdn]
- [useInterval](/react-timing-hooks/loops-and-intervals/useInterval.html)

#### Request Idle Callback | [MDN][idle-cb-mdn]
- [useIdleCallback](/react-timing-hooks/callbacks/useIdleCallback.html).
- [useIdleCallbackEffect](/react-timing-hooks/effects/useIdleCallbackEffect.html)

#### Request Animation Frame | [MDN][raf-mdn]
- [useAnimationFrame](/react-timing-hooks/callbacks/useAnimationFrame.html)
- [useAnimationFrameLoop](/react-timing-hooks/loops-and-intervals/useAnimationFrameLoop.html)

## By use case

#### Rate limiting / throttling / debouncing
- [useThrottledState](/react-timing-hooks/state/useThrottledState.html) - tame rapid firing state updates, reducing the number of React updates
- [useThrottle](/react-timing-hooks/callbacks/useThrottle.html)
- [useDebounce](/react-timing-hooks/callbacks/useDebounce.html)

#### Reactive counters & timers
- [useCounter](/react-timing-hooks/loops-and-intervals/useCounter.html) - a reactive, customizable counter
- [useTimer](/react-timing-hooks/loops-and-intervals/useTimer.html) - a timer
- [useCountdown](/react-timing-hooks/loops-and-intervals/useCountdown.html) - a countdown (ends automatically)

#### GFX / animation /  rendering
- [useAnimationFrameLoop](/react-timing-hooks/loops-and-intervals/useAnimationFrameLoop.html) - for animations, rendering etc.

#### Time
- [useClock](/react-timing-hooks/loops-and-intervals/useClock.html) - displays a real-time digital clock

#### Tracking
- [useIdleCallback](/react-timing-hooks/callbacks/useIdleCallback.html)**


[interval-mdn]: https://developer.mozilla.org/en-US/docs/Web/API/setInterval
[timeout-mdn]: https://developer.mozilla.org/en-US/docs/Web/API/setTimeout
[idle-cb-mdn]: https://developer.mozilla.org/en-US/docs/Web/API/Window/requestIdleCallback
[raf-mdn]: https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame