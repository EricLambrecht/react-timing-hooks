---
nav_exclude: true
---

---
title: title
parent: parent
nav_order: 1
---

#useClock

This hook can be used to render a clock, i.e. a time-string that updates every second.

# title

## Example

## API

### Params

`signature()`

| Name             | Description                                                          |
|:-----------------|:---------------------------------------------------------------------|
| callback         | bla                          |
| timeout          | the timeout in milliseconds

### Return value

This hooks has no return value.


## param list with defaults

| Name         | Default           | Description                                                          |
|:-------------|:------------------|:---------------------------------------------------------------------|
| callback     | `undefined`       | a function that will be invoked as soon as the timeout expires       |
| timeout      | `undefined`       | the timeout in milliseconds                                          |


## param list without defaults

| Name             | Description                                                          |
|:-----------------|:---------------------------------------------------------------------|
| callback         | a function that will be invoked as soon as the timeout expires       |
| timeout          | the timeout in milliseconds                                          |
