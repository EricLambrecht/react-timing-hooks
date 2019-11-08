export type TimeoutCreator = (handler: () => unknown, timeout: number) => any

export type TimeoutId = ReturnType<typeof setTimeout>

export type TimeoutCallback = (...args: any[]) => unknown

export type TimeoutEffectCallback = (
  timeoutFunc: TimeoutCreator
) => void | (() => void | undefined)