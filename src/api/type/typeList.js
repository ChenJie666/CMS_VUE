import request from '../../utils/request_cp'
import qs from "qs";

export function getTypeListInfo() {
    return request({
        url: '/menu/findWebMenuTypeList',
        method: 'get',
    })
}

export function delTypeItem(params) {
    params = qs.stringify(params, { indices: false });
    return request({
        url: '/menu/deleteMenuType' + '?' + params,
        method: 'delete',
    })
}

export function addTypeItem(data) {
    return request({
        url: '/menu/addMenuType',
        method: 'post',
        data: data
    })
}

export function getTypeDetailInfo(params) {
    return request({
        url: '/menu/findWebMenuTypeDetail',
        method: 'get',
        params: params
    })
}
export function postTypeDetailInfo(data) {
    return request({
        url: '/menu/updateMenuType',
        method: 'post',
        data: data
    })
}
