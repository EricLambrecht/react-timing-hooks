---
layout: default
title: Timeouts
nav_order: 2
has_children: true
---

# Timeouts

All these hooks are basically react-specific wrappers for [setTimeout()](https://developer.mozilla.org/en-US/docs/Web/API/setTimeout). 
{: .fs-6 .fw-300 }

All of these hooks will automatically take care of clearing any pending timeouts that you set if the component unmounts for example.
