---
layout: default
title: Effects
nav_order: 4
has_children: true
---

# Effects

React hooks that wrap [window.requestIdleCallback()][idle-cb-mdn].
{: .fs-6 .fw-300 }

All of these hooks will automatically take care of unregistering / cancelling any pending idle callbacks that you started if the component unmounts for example.

[idle-cb-mdn]: https://developer.mozilla.org/en-US/docs/Web/API/Window/requestIdleCallback
