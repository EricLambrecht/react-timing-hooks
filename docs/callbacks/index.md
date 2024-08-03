---
layout: default
title: Callbacks / Functions
nav_order: 3
has_children: true
---

# Timeouts

React hooks that return some form of timed callback.
{: .fs-6 .fw-300 }

Most of these callbacks are based on [setTimeout()][timeout-mdn].

For *rate-limiting* use `useThrottle()` or `useDebounce()`. For *pure timeouts* use `useTimeout()` or `useTimeoutEffect()`.

{: .note }
All of these hooks are memoized and will automatically take care of clearing any pending timeouts on unmount.

[timeout-mdn]: https://developer.mozilla.org/en-US/docs/Web/API/setTimeout
