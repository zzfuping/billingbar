

export const normalizeError = api => {
  return params => {
    return api(params).catch(e => {
      const err = e || {}

      let code = 'unknown_error'

      if (typeof err.code === 'number' || typeof err.code === 'string') {
        code = err.code
      } else if (err.type) {
        code = err.type
      }

      const desc = err.errMsg || err.desc || err.message || ''

      return Promise.reject({ code, desc })
    })
  }
}

/***
 * @class
 * 表示请求过程中发生的异常
 */
export class RequestError extends Error {
  constructor(type, message) {
    super(message)
    this.type = type
    this.message = message
  }
}

/***
 * @class
 * 表示登录过程中发生的异常
 */
export class LoginError extends Error {
  constructor(type, message) {
    super(message)
    this.type = type
    this.message = message
  }
}
  
export default {
    normalizeError,
    RequestError,
    LoginError
}