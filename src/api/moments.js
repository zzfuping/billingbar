import request from '@utils/request'

/*
 * 获取所有圈子
 * */
export const getMomentList = (data) => {
    return request.post("/book/moments/all", data)
}

/*
 *  添加圈子
 * */
export const createMoment = (data) => {
    return request.post("/book/moments/createOne", data)
}