---
layout: default
title: Idle Callbacks
nav_order: 5
has_children: true
---

# Idle Callbacks

All these hooks are basically react-specific wrappers for [requestIdleCallback()](https://developer.mozilla.org/en-US/docs/Web/API/Window/requestIdleCallback).
{: .fs-6 .fw-300 }

All of these hooks will automatically take care of unregistering / cancelling any pending idle callbacks that you started if the component unmounts for example.
