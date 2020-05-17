import request from '@utils/request'

/*
 * 获取所有记账类型
 * */
export const getAllBookType = (data) => {
    return request.post("/book/type/all", data)
}