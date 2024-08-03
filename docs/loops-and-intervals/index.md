---
layout: default
title: Loops & Intervals
description: React hooks for creating loops and intervals
nav_order: 2
has_children: true
---

# Loops and Intervals

React hooks for calling functions at a regular interval.
{: .fs-6 .fw-300 }

Many of these hooks are built upon [setInterval()][interval-mdn].

The intervals that these hooks create can be **paused, resumed, stopped and re-started**. Counters can also be **reset**.
Additionally, these hooks will automatically take care of clearing any pending intervals if a component unmounts too early for example.

{: .note }
Most of these hooks **do not automatically start** on mount, but rather have to be started manually via the returned `start()` function. However, you can start automatically by setting `options.startOnMount = true`.

[interval-mdn]: https://developer.mozilla.org/en-US/docs/Web/API/setInterval

