---
layout: default
title: Intervals
nav_order: 3
has_children: true
---

# Intervals

React hooks that wrap [setInterval()](https://developer.mozilla.org/en-US/docs/Web/API/setInterval) or build on top of it.
{: .fs-6 .fw-300 }

The intervals that these hooks create can be **paused, resumed, stopped and re-started**. 
Additionally, they will automatically take care of clearing any intervals that you set if 
the component unmounts for example.

Please note that most of these hooks do not start immediately start on mount, but rather have to be
started manually via the returned `start()` function. You can opt-in to starting on mount, though, by
using the option `startOnMount = true`.
