import request from '../utils/request_cp'

export function getDeviceList() {
    return request({
        url: '/menu/findDeviceTypeList',
        method: 'get',
    })
}
export function getMenuTypeList() {
    return request({
        url: '/menu/findWebMenuTypeList',
        method: 'get',
    })
}
export function getLibraryList() {
    return request({
        url: '/menu/findLibraryList',
        method: 'get',
    })
}

export function getNutritionalList() {
    var dt = [
        { value: 1, label: "卡路里", end: "千卡" },
        { value: 2, label: "蛋白质", end: "克" },
        { value: 3, label: "脂肪", end: "克" },
        { value: 4, label: "碳水化合物", end: "克" },
    ]
    return dt
}
export function getForKitchenElectricList() {
    var dt = ["蒸", "烤", "蒸+烤"]
    return dt
}
export function getParameterList() {
    return request({
        url: '/menu/findSpecificationList',
        method: 'get',
    })
}
export function getParameterValueList(params) {
    return request({
        url: '/menu/findArgumentsList',
        method: 'get',
        params: params
    })
}
export function getParameterValueList1() {
    var dt = [
        { value: 1, label: "100" },
        { value: 2, label: "200" },
        { value: 3, label: "300" },
        { value: 4, label: "400" },
        { value: 5, label: "500" },
        { value: 6, label: "600" },
        { value: 7, label: "700" },
        { value: 8, label: "800" },
        { value: 9, label: "900" },
        { value: 10, label: "1000" },
        { value: 11, label: "1100" },
        { value: 12, label: "1200" },
        { value: 13, label: "1300" },
        { value: 14, label: "1400" },
        { value: 15, label: "1500" },
        { value: 16, label: "1600" },
        { value: 17, label: "1700" },
        { value: 18, label: "1800" },
        { value: 19, label: "1900" },
        { value: 20, label: "2000" },
    ]
    return dt
}
export function getParameterValueList2() {
    var dt = [
        { value: 1, label: "劲道" },
        { value: 2, label: "酥软" },
        { value: 3, label: "嫩" },
        { value: 4, label: "普通" },
        { value: 5, label: "老" },
    ]
    return dt
}
export function getParameterValueList3() {
    var dt = [
        { value: 1, label: "深" },
        { value: 2, label: "浅" },
    ]
    return dt
}
export function getModeList() {
    return request({
        url: '/menu/findModeList',
        method: 'get',
    })
}
export function getDegList() {
    var dt = ["简单", "中等", "困难"]
    return dt
}
export function getStatusList() {
    var dt = [
        { value: 0, label: "草稿" },
        { value: 1, label: "未发布" },
        { value: 2, label: "发布" }
    ]
    return dt
}
export function getIsOfficialList() {
    var dt = [
        { value: true, label: "官方" },
        { value: false, label: "非官方" },
    ]
    return dt
}