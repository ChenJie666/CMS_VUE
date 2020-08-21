import request from '../../utils/request_cp'
import qs from "qs";

export function getColumnMenu(params) {
    return request({
        url: '/menu/findWebMenuColumn',
        method: 'get',
        params: params
    })
}

export function getColumnMenuList(params) {
    return request({
        url: '/menu/findWebMenuColumnList',
        method: 'get',
        params: params
    })
}

export function postColumnMenuItem(data) {
    return request({
        url: '/menu/updateMenuInColumn',
        method: 'post',
        data: data
    })
}

export function addColumnMenuItem(data) {
    return request({
        url: '/menu/addMenuInColumn',
        method: 'post',
        data: data
    })
}
export function delColumnMenuItem(params,param2) {
    params = qs.stringify(params, { indices: false });
    param2 = qs.stringify(param2, { indices: false });
    return request({
        url: '/menu/deleteMenuInColumn' + '?' + params + '&' + param2 ,
        method: 'delete',
    })
}