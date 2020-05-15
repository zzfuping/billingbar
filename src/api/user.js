import request from '@utils/request'

/*
 * TODO: 小程序登陆
 * */
export function wxappAuth(data) {
    // return request.post("/wxapp/auth", data, { login: false });
    return Promise.resolve({
        status: 200,
        data: {
            code: 0, 
            data: {
                token: 'tokendemo'
            }
        }
    })
}