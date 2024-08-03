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
- [useTimeout](/react-timing-hooks/timeouts-api/useTimeout.html)
- [useTimeoutEffect](/react-timing-hooks/timeouts-api/useTimeoutEffect.html)

#### Set Interval | [MDN][interval-mdn]
- [useInterval](/react-timing-hooks/intervals-api/useInterval.html)

#### Request Idle Callback | [MDN][idle-cb-mdn]
- [useIdleCallback](/react-timing-hooks/idle-callback-api/useIdleCallback.html).
- [useIdleCallbackEffect](/react-timing-hooks/idle-callback-api/useIdleCallbackEffect.html)

#### Request Animation Frame | [MDN][raf-mdn]
- [useAnimationFrame](/react-timing-hooks/animation-api/useAnimationFrame.html)
- [useAnimationFrameLoop](/react-timing-hooks/animation-api/useAnimationFrameLoop.html)

## By use case

#### Rate limiting / throttling / debouncing
- [useThrottledState](/react-timing-hooks/general-utility/useThrottledState.html) - tame rapid firing state updates, reducing the number of React updates
- [useThrottle](/react-timing-hooks/timeouts-api/useThrottle.html)
- [useDebounce](/react-timing-hooks/timeouts-api/useDebounce.html)

#### Reactive counters & timers
- [useCounter](/react-timing-hooks/intervals-api/useCounter.html) - a reactive, customizable counter
- [useTimer](/react-timing-hooks/intervals-api/useTimer.html) - a timer
- [useCountdown](/react-timing-hooks/intervals-api/useCountdown.html) - a countdown (ends automatically)

#### GFX / animation /  rendering
- [useAnimationFrameLoop](/react-timing-hooks/animation-api/useAnimationFrameLoop.html) - for animations, rendering etc.

#### Time
- [useClock](/react-timing-hooks/intervals-api/useClock.html) - displays a real-time digital clock

#### Tracking
- [useIdleCallback](/react-timing-hooks/idle-callback-api/useIdleCallback.html)**


[interval-mdn]: https://developer.mozilla.org/en-US/docs/Web/API/setInterval
[timeout-mdn]: https://developer.mozilla.org/en-US/docs/Web/API/setTimeout
[idle-cb-mdn]: https://developer.mozilla.org/en-US/docs/Web/API/Window/requestIdleCallback
[raf-mdn]: https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame