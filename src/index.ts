import useTimeoutEffect from './timeout/useTimeoutEffect'
import { TimeoutEffectCallback } from './timeout/types'
import useTimeout from './timeout/useTimeout'
import useInterval, {
  IntervalControls,
  IntervalOptions,
} from './interval/useInterval'
import useTimer from './interval/useTimer'
import useIdleCallbackEffect from './idle-callback/useIdleCallbackEffect'
import { IdleCallbackEffectCallback } from './idle-callback/types'
import useIdleCallback from './idle-callback/useIdleCallback'
import useAnimationFrame from './animation-frame/useAnimationFrame'
import useAnimationFrameLoop from './animation-frame/useAnimationFrameLoop'
import useClock from './interval/useClock'
import { ClockOptions } from './interval/useClock'
import useCounter, { CounterSettings } from './interval/useCounter'
import useCountdown, { CountdownSettings } from './interval/useCountdown'
import { DebounceOptions, useDebounce } from './timeout/useDebounce'
import { ThrottleOptions, useThrottle } from './timeout/useThrottle'
import useThrottledState from './general-utility/useThrottledState'

export {
  useAnimationFrame,
  useAnimationFrameLoop,
  useClock,
  useCountdown,
  useCounter,
  useDebounce,
  useIdleCallback,
  useIdleCallbackEffect,
  useInterval,
  useThrottle,
  useTimer,
  useTimeout,
  useTimeoutEffect,
  useThrottledState,
  ClockOptions,
  CountdownSettings as CountdownOptions,
  CounterSettings,
  DebounceOptions,
  IdleCallbackEffectCallback,
  IntervalControls,
  IntervalOptions,
  ThrottleOptions,
  TimeoutEffectCallback,
}
