---
layout: default
title: Animation
nav_order: 4
has_children: true
---

# Animation

React hooks that wrap [window.requestAnimationFrame()][raf-mdn].
{: .fs-6 .fw-300 }

All of these hooks will automatically take care of cancelling any pending animation frame callbacks that you started if the component unmounts for example.

[raf-mdn]: https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame
