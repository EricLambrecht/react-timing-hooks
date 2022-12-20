const LIB_NAME = 'React Timing Hooks'

const buildMessage = (message: string) => {
  return `${LIB_NAME}: ${message}`
}

export const log = (logFunction: 'log' | 'warn' | 'error', message: string) => {
  if (process.env?.NODE_ENV === 'test') {
    return
  }
  console[logFunction](buildMessage(message))
}

export const logInfo = (message: string) => log('log', message)
export const logError = (message: string) => log('error', message)
export const logWarning = (message: string) => log('warn', message)
