import useTimeoutEffect from './timeout/useTimeoutEffect'
import { TimeoutEffectCallback } from './timeout/types'
import useTimeout from './timeout/useTimeout'
import useInterval from './interval/useInterval'
import useTimer from './interval/useTimer'
import useIdleCallbackEffect from './idle-callback/useIdleCallbackEffect'
import { IdleCallbackEffectCallback } from './idle-callback/types'
import useIdleCallback from './idle-callback/useIdleCallback'
import useAnimationFrame from './animation-frame/useAnimationFrame'
import useAnimationFrameLoop from './animation-frame/useAnimationFrameLoop'
import useClock from "./interval/useClock";
import { ClockOptions } from "./interval/useClock";


export {
  useAnimationFrame,
  useAnimationFrameLoop,
  useClock,
  useIdleCallback,
  useIdleCallbackEffect,
  useInterval,
  useTimer,
  useTimeout,
  useTimeoutEffect,
  IdleCallbackEffectCallback,
  TimeoutEffectCallback,
  ClockOptions
}
