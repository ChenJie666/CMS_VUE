import request from '../../utils/request_cp'
import qs from "qs";

export function getColumnList() {
    return request({
        url: '/menu/findWebMenuColumn',
        method: 'get'
    })
}
export function delColumnListItem(params) {
    return request({
        url: '/menu/deleteMenuTitle',
        method: 'delete',
        params:params
    })
}
export function postColumnListItem(data) {
    return request({
        url: '/menu/updateMenuTitle',
        method: 'post',
        data: data
    })
}
export function addColumnListItem(data) {
    return request({
        url: '/menu/addMenuTitle',
        method: 'post',
        data: data
    })
}
export function getColumnListItem(params) {
    return request({
        url: '/menu/findWebMenuTitle',
        method: 'get',
        params: params
    })
}