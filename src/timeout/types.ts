export type TimeoutCreator = (handler: () => unknown, timeout: number) => any

export type TimeoutEffectCallback = (
  timeoutFunc: TimeoutCreator
) => void | (() => void | undefined)
