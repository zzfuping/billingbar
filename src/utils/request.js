import Fly from "flyio/dist/npm/wx"
import Auth from '@libs/auth'
import { API_ROOT, API_CODE } from '@config'

const fly = new Fly()
fly.config.baseURL = API_ROOT

const defaultOpt = { login: true }

//添加请求拦截器
fly.interceptors.request.use((request) => {
  const session = Auth.Session.get()
  if (request.login && !session) {
    return Promise.reject(new Error("未登录"));
  }

  //给需要登录的请求添加 Token
  if (request.login) {
    request.headers["access-token"] = session
  }

  return request
})

//添加响应拦截器，响应拦截器会在then/catch处理之前执行
fly.interceptors.response.use(
  (response) => {
      return response
  },
  error => {
    if (error.toString() == 'Error: Network Error' || error.status == 401) {
      return Promise.reject(new Error("未登录"))
    }
    return Promise.reject(error)
  }
)

/**
 * http 请求基础类
 * 参考文档 https://www.kancloud.cn/yunye/axios/234845
 *
 */
function baseRequest(options) {
  const { url, params, data, login, ...option } = options
  return fly.request(url, params || data, {
    login,
    ...option
  }).then(res => {
    const data = res.data || {};
    if (res.status !== 200)
      return Promise.reject({ msg: "请求失败", res, data });

    if (data.code === API_CODE.OK) {
      return Promise.resolve(data, res);
    } else {
      return Promise.reject({ msg: res.data.msg, res, data });
    }
  })
}

const request = ["post", "put", "patch"].reduce((request, method) => {
    /**
     *
     * @param url string 接口地址
     * @param data object get参数
     * @param options object axios 配置项
     * @returns {AxiosPromise}
     */
    request[method] = (url, data = {}, options = {}) => {
      options = Object.assign({}, defaultOpt, options)
      return baseRequest(
        Object.assign({ url, data, method }, options)
      )
    }
    return request
  }, {})
  
  // ["get", "delete", "head"].forEach(method => {
  //   /**
  //    *
  //    * @param url string 接口地址
  //    * @param params object get参数
  //    * @param options object axios 配置项
  //    * @returns {AxiosPromise}
  //    */
  //   request[method] = (url, params = {}, options = {}) => {
  //     return baseRequest(
  //       Object.assign({ url, params, method }, defaultOpt, options)
  //     )
  //   }
  // })
  
  export default request