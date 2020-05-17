import Session from './session'
import consts from './consts'
import { LoginError } from '@errors'
import { promisify } from '@utils/promisify'
import { wxappAuth } from '@api/user'
import { API_CODE } from '@config'

const wxLogin = promisify(wx.login)
const defaultOptions = {
  method: 'GET',
}
/**
 * 微信登录，获取 code
 */
const getWxLoginResult = () => {
  return wxLogin().then(loginResult => ({
    code: loginResult.code
  })).catch(err => {
    const errMsg = err.errMsg || ''

    let error = null

    if (errMsg.indexOf('login:fail') === 0) {
      error = new LoginError(consts.ERR_WX_LOGIN_FAILED, '微信登录失败，请检查网络状态')
    } else {
      error = new LoginError(consts.ERR_WX_GET_USER_INFO, '获取微信用户信息失败，请检查网络状态')
    }

    error.detail = err

    return Promise.reject(error)
  })
}

/**
 * @method
 * 进行服务器登录，以获得登录会话
 *
 * @param {Object}   options           登录配置
 * @param {string}   [options.method]  可选。请求使用的 HTTP 方法，默认为 GET
 */
export const login = options => {
  options = { ...defaultOptions, ...options }
  
  // 连接服务器登录
  return getWxLoginResult().then(loginResult => wxappAuth({
    wxCode: loginResult.code,
  })).catch((err) => {
    let error = new LoginError(consts.ERR_LOGIN_FAILED, '登录失败，可能是网络错误或者服务器发生异常')
    error.detail = err
    return Promise.reject(error)
  }).then(data => {
    console.log('login ok', data)
    if (!data || !data.code || !data.data) {
      return Promise.reject(new LoginError(consts.ERR_LOGIN_FAILED, `响应错误，${JSON.stringify(data)}`))
    }

    const res = data.data
    if (!res || !res.session) {
      return Promise.reject(new LoginError(consts.ERR_LOGIN_SESSION_NOT_RECEIVED, `登录失败[${data.error}] ${data.message}`))
    }

    Session.set(res.session)
    return res
  })
}

export default { 
  login
}