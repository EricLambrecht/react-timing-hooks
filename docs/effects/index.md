---
layout: default
title: Effects
nav_order: 4
has_children: true
---

# Effects

React hooks that are based on `useEffect()`.
{: .fs-6 .fw-300 }

These hooks behave like a regular `useEffect` except that you gain access to timeouts etc. in your effect callback. 
These timeouts (or idle callbacks) will be managed by react-timing-hooks, i.e. they will also be cleaned up properly.

[idle-cb-mdn]: https://developer.mozilla.org/en-US/docs/Web/API/Window/requestIdleCallback
