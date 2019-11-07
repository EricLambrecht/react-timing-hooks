export type IdleCallbackCreator = (
  callback: (deadline: RequestIdleCallbackDeadline) => unknown,
  options?: RequestIdleCallbackOptions
) => RequestIdleCallbackHandle

export type IdleCallbackEffectCallback = (
  requestIdleCallback: IdleCallbackCreator
) => void | (() => void | undefined)

export type RequestIdleCallbackHandle = number

export type RequestIdleCallbackOptions = {
  timeout: number
}

export type RequestIdleCallbackDeadline = {
  readonly didTimeout: boolean
  timeRemaining: () => number
}
