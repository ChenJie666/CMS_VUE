import request from '../../utils/request_cp'
import qs from "qs";

export function getBannerListInfo(params) {
    return request({
        url: '/menu/findWebCarouselList',
        method: 'get',
        params: params
    })
}
export function addBannerItemInfo(data) {
    return request({
        url: '/menu/addCarousel',
        method: 'post',
        data: data
    })
}
export function delBannerList(params) {
    params = qs.stringify(params, { indices: false });
    return request({
        url: '/menu/deleteCarousel' + '?' + params,
        method: 'delete',
    })
}
export function postBannerItemInfo(data) {
    return request({
        url: '/menu/updateCarousel',
        method: 'post',
        data: data
    })
}