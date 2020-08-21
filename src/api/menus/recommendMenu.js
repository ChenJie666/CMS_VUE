import request from '../../utils/request_cp'
import qs from "qs";

export function addRecommendItem(data) {
    return request({
        url: "/menu/addDeviceRecommendMenu",
        method: "post",
        data: data
    })
}

export function getRecommendMenuListInfo(params) {
    return request({
        url: '/menu/findDeviceRecommendMenuList',
        method: 'get',
        params: params
    })
}

export function delRecommendMenuList(params) {
    params = qs.stringify(params, { indices: false });
    return request({
        url: '/menu/deleteDeviceRecommendMenu' + '?' + params,
        method: 'delete',
    })
}
export function getRecommendDetailInfo(params) {
    return request({
        url: '/menu/findDeviceRecommendDetail',
        method: 'get',
        params: params
    })
}
export function postRecommendDetailInfo(data) {
    return request({
        url: '/menu/updateDeviceRecommendMenu',
        method: 'post',
        data: data
    })
}