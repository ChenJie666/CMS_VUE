import request from '../../utils/request_cp'
import qs from "qs";

export function addIndexRecommendItem(data) {
    return request({
        url: "/menu/addRecommendMenu",
        method: "post",
        data: data
    })
}

export function getIndexRecommendMenuListInfo() {
    return request({
        url: '/menu/findWebRecommendMenu',
        method: 'get',
    })
}