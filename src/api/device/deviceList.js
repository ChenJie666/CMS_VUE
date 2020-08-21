import request from '../../utils/request_cp'
import qs from "qs";

export function getDeviceListInfo() {
    return request({
        url: '/menu/findDeviceTypeList',
        method: 'get',
    })
}

export function delDeviceItem(params) {
    params = qs.stringify(params, { indices: false });
    return request({
        url: '/menu/deleteDeviceType' + '?' + params,
        method: 'delete',
    })
}

export function addDeviceItem(data) {
    return request({
        url: '/menu/addDeviceType',
        method: 'post',
        data: data
    })
}

export function getDeviceInfo() {
    return request({
        url: '/menu/findDeviceTypeList',
        method: 'get',
    })
}

export function getDeviceDetailInfo(params) {
    return request({
        url: '/menu/findDeviceTypeDetail',
        method: 'get',
        params: params
    })
}
export function postDeviceDetailInfo(data) {
    return request({
        url: '/menu/updateDeviceType',
        method: 'post',
        data: data
    })
}
