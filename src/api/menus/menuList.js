import request from '../../utils/request_cp'
import qs from "qs";

export function getMenuListInfo(params) {
    return request({
        url: '/menu/findCheckMenuList',
        method: 'get',
        params: params
    })
}
export function getMenuDraftListInfo(params) {
    return request({
        url: '/menu/findMenuDraftsList',
        method: 'get',
        params: params
    })
}
export function getMenuRecycleListInfo(params) {
    return request({
        url: '/menu/findMenuRecycleList',
        method: 'get',
        params: params
    })
}
export function delMenuList(params) {
    params = qs.stringify(params, { indices: false });
    return request({
        url: '/menu/deleteMenu' + '?' + params,
        method: 'delete',
    })
}
export function delCompleteMenuList(params) {
    params = qs.stringify(params, { indices: false });
    return request({
        url: '/menu/completeDeleteMenu' + '?' + params,
        method: 'delete',
    })
}
export function getExcelStream(s) {
    var url = "http://192.168.32.128/menu/exportMenuDetailList?" + qs.stringify(s, { indices: false });
    const link = document.createElement("a");
    link.href = url;
    link.click();
}
export function getMenuDetailInfo(params) {
    return request({
        url: '/menu/findWebMenuDetail',
        method: 'get',
        params: params
    })
}
export function postMenuDetailInfo(data) {
    return request({
        url: '/menu/updateMenu',
        method: 'post',
        data: data
    })
}
export function addMenuDetailInfo(data) {
    return request({
        url: '/menu/addMenu',
        method: 'post',
        data: data
    })
}
export function restoreMenuInfo(params) {
    return request({
        url: '/menu/restoreMenu',
        method: 'get',
        params: params
    })
}
