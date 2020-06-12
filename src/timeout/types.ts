export type TimeoutCreator = (handler: () => unknown, timeout: number) => any

export type TimeoutId = ReturnType<typeof setTimeout>

export type TimeoutEffectCallback = (
  timeoutFunc: TimeoutCreator,
  clearFunc: () => void
) => void | (() => void | undefined)
