import request from '@utils/request'

/*
 * 小程序登陆
 * */
export function wxappAuth(data) {
    return request.post("/user/login", data, { login: false });
}