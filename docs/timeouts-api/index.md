---
layout: default
title: Timeouts
nav_order: 2
has_children: true
---

# Timeouts

React hooks that wrap [setTimeout()][timeout-mdn]. 
{: .fs-6 .fw-300 }

This is a collection of timeout based hooks.

For rate-limiting use `useThrottle()` or `useDebounce()`. For pure timeouts use `useTimeout()` or `useTimeoutEffect()`.

All of these hooks will automatically take care of clearing any pending timeouts that you set if the component unmounts for example.

[timeout-mdn]: https://developer.mozilla.org/en-US/docs/Web/API/setTimeout
