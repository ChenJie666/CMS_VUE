import request from '../../utils/request_cp'
import qs from "qs";

export function getArticleListInfo(params) {
    return request({
        url: '/menu/findArticleList',
        method: 'get',
        params: params
    })
}

export function delArticleList(params) {
    params = qs.stringify(params, { indices: false });
    return request({
        url: '/menu/deleteArticle' + '?' + params,
        method: 'delete',
    })
}

export function getArticleDetailInfo(params) {
    return request({
        url: '/menu/findArticleDetail',
        method: 'get',
        params: params
    })
}
export function postArticleDetailInfo(data) {
    return request({
        url: '/menu/updateArticle',
        method: 'post',
        data: data
    })
}
export function addArticleDetailInfo(data) {
    return request({
        url: '/menu/addArticle',
        method: 'post',
        data: data
    })
}