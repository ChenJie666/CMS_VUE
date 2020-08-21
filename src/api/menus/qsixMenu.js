import request from '../../utils/request_cp'
import qs from "qs";
export function getQsixMenuListInfo(params) {
    return request({
        url: '/menu/findDeviceMenuList',
        method: 'get',
        params: params
    })
}
export function addQsixItem(data) {
    return request({
        url: "/menu/addDeviceMenu",
        method: "post",
        data: data
    })
}
export function delQsixMenuList(params) {
    params = qs.stringify(params, { indices: false });
    return request({
        url: '/menu/deleteDeviceMenu' + '?' + params,
        method: 'delete',
    })
}
export function getQsixDetailInfo(params) {
    return request({
        url: '/menu/findDeviceMenuDetail',
        method: 'get',
        params: params
    })
}
export function postQsixDetailInfo(data) {
    return request({
        url: '/menu/updateDeviceMenu',
        method: 'post',
        data: data
    })
}