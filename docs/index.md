---
layout: default
title: Quick Start
nav_order: 1
has_children: false
---


# React Timing Hooks Documentation

You can install `react-timing-hooks` via npm/yarn, see below for details.

The APIs of all hooks are documented on this page (see sidebar). They should be pretty straight forward, but feel free
to add an issue on GitHub if you have any ideas for improvement.

Also keep in mind: React timing hooks (as the name implies) are only useful and will in fact only work inside React components.

## About

In general all of these hooks are more or less wrappers for standard javascript functions. But since they can be quite
a pain to handle in React components (leaks upon unmount etc.), I wrote this little package.

There are currently hooks available for:

* setTimeout (useTimeout, useTimeoutEffect)
* setInterval (useInterval, useTimer, useClock)
* requestAnimationFrame (useAnimationFrame, useAnimationFrameLoop)
* requestIdleCallback (useIdleCallback, useIdleCallbackEffect)

## Installation

```bash
# via npm
npm i react-timing-hooks

# via yarn
yarn add react-timing-hooks
```

**Note:** You have to install React `^16.8.0` or `^17.0.0`, too, in order to use this package.


