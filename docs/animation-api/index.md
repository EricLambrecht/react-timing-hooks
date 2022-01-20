---
layout: default
title: Animation
nav_order: 4
has_children: true
---

# Animation

All these hooks are basically react-specific wrappers for [requestIAnimationFrame()](https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame).
{: .fs-6 .fw-300 }

All of these hooks will automatically take care of cancelling any pending idle animation frame callbacks that you started if the component unmounts for example.
